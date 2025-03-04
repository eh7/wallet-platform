import React from 'react';
import {openDB} from 'idb';
import * as indexedDB from 'idb';

import Wallet from '../../services/wallet';

const dbVersion = 2

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      files: [],
      form: {phrase:''},
      pharse: '',
      dbStatus: false,
      listening: false,
      dbName: 'filesystem-database',
      storeName: 'files',
      dbNameNew: 'filesystem-database-new',
      storeNameTest: 'newFiles',
    };

  }

  createStoreInDBNew = async () => {
    try {
      const dbName =this.state.dbNameNew 
      const storeName = this.state.storeName
      const dbPromise = openDB(dbName, dbVersion, {
        upgrade(db) {
          db.createObjectStore(storeName);
          console.log("db.createObjectStore ::", dbName, storeName)
        },
      });
    } catch (e) {
      console.error('ERROR in :: createStoreInDBNew :: ', e)
    };
  }

  createStoreInDB = async () => {
    try {
      //const dbName = 'filesystem-database'
      //const storeName = 'files'
      const dbName =this.state.dbName
      const storeName = this.state.storeName
      const storeNameTest = this.state.storeNameTest
      const dbPromise = openDB(dbName, dbVersion, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName)
          }
          if (!db.objectStoreNames.contains(storeNameTest)) {
            db.createObjectStore(storeNameTest)
          }
          console.log('UPGRADE indexedDB OKAY! version:', dbVersion, db.objectStoreNames)
        },
      });
    } catch (e) {
      console.error('ERROR in :: createStoreInDB :: ', e)
    };
  }

  indexedDBStuff = () => {
    if (!('indexedDB' in window)) {
      console.log("This browser doesn't support IndexedDB");
      return false;
    } else {
      return true
    }
  }

  createStoreInDBOld = async () => {

    try {
      this.setState({ phrase: await this.wallet.getNewPhraseData() });
      console.log("phrase:", this.state.phrase);
      const dbName = 'filesystem-database'
      const storeName = 'files'
      const db = await openDB(dbName, dbVersion)
      this.setState({ keys: await db.getAllKeys(storeName) })
      this.setState({ files: await db.getAll(storeName) })
      console.log('keys', this.state.keys)
      console.log('files', this.state.files)
    } catch (e) {
      console.error("ERROR CATCH :: createStoreInDB :: ", e)
    }
  }

  readChunks = (reader) => {
    return {
      async* [Symbol.asyncIterator]() {
        let readResult = await reader.read();
        while (!readResult.done) {
          yield readResult.value;
          readResult = await reader.read();
        }
      },
    };
  }

  handleLatestClick = async (event) => {
    const newFiles = []
    try {
      const addressUser = await this.wallet.getAddress()
      const addressData = await this.wallet.getDataWalletPhrase(this.state.phrase)
      const url = "http://localhost:3333/latest/" + addressData + '/' + addressUser
//console.log('handleLatestClick url', url)
      const response = await fetch(url, {
        method: "GET",
//      //body: JSON.stringify({ username: "example" }),
//      body: dataString,
      })
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf8');
      let files = ''
      for await (const chunk of this.readChunks(reader)) {
        console.log(`received chunk of size ${chunk.length}`);
        //console.log(decoder.decode(chunk))
        files = files + decoder.decode(chunk) 
      }
      files = JSON.parse(files)
      console.log('files', files)
      /*
      files.map((file, index) => {
        const decryptedFileData = this.wallet.decryptFileData(
          file,
          this.state.phrase,
        )
        console.log('decryptedFilesData array index=' + index, file, decryptedFileData);
      })
      */
      files.map((file) => {
        newFiles.push(this.wallet.decryptFilesData(file, this.state.phrase))
      })
      //WIP
      console.log('decryptFilesData :: decrypted :: ', newFiles)
      this.updateFiles(newFiles)
    } catch (err) {
      console.error('ERROR :: handleLatestClick ::', err)
    }
  }

  handleListenClick = (event) => {
    try {
      let value = document.querySelector('#listenSwitch').value;
      if (document.querySelector('#listenSwitch').value === 'off') {
        document.querySelector("#listenSwitch").value = "on";
        this.syncSwitchOn()
        console.log("initiate publishing of latest files data on REST API or p2p broadcast")
      } else {
        document.querySelector("#listenSwitch").value = "off";
        this.syncSwitchOff()
        console.log("p2p signoff and halt publishing of latest files data")
      }
    } catch (e) {
      console.error(':: handleListenClick ERROR :: ', e)
      alert(':: handleListenClick ERROR :: ' +  e.message)
    }
  }

  syncSwitchOn = async (event) => {
    //console.log('files', this.state.files)

    const address = await this.wallet.getAddress()

    const encryptedFilesData = await this.wallet.encryptFilesData(
      this.state.files,
      this.state.phrase,
      address
    )
    console.log('encryptedFilesData', encryptedFilesData);
    console.log(JSON.stringify(encryptedFilesData))

    const decryptedFilesData = this.wallet.decryptFilesData(
      encryptedFilesData,
      this.state.phrase,
    )
    console.log('decryptedFilesData', decryptedFilesData);

    encryptedFilesData.encryptedFiles.map((file, index) => {
      const decryptedFilesData = this.wallet.decryptFilesData(
        file,
        this.state.phrase,
      )
      console.log('decryptedFilesData array index=' + index, decryptedFilesData);
    })

    try {
      const data = JSON.stringify(
        encryptedFilesData.hashes
      );
      const signature = await this.wallet.signMessage(data);
      const recoveredAddress = await this.wallet.recoverAddressFromMessage(data, signature);
      console.log({
        text: 'signMessage',
        state: (address === recoveredAddress),
        address,
        recoveredAddress,
        data: encryptedFilesData.hashes,
      });
      //3333
      const url = "http://localhost:3333/publishNew";
      //const dataString = "this is a data string in the components/Data/FileUpload.js" 
      const dataString = JSON.stringify(encryptedFilesData) 
      const response = await fetch(url, {
        method: "POST",
        //body: JSON.stringify({ username: "example" }),
        body: dataString,
      })
      console.log({
        response,
      })
   } catch (err) {
     console.error('signMessage', err)
   }

    alert('on')
  }

  syncSwitchOff = (event) => {
    alert('off')
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async (e) => {
      // Code to handle the uploaded file
      console.log(file)
      const fileString = e.target.result;
      console.log(fileString)
      console.log("fileString size : " + fileString.length);

      let ob = {
        created:new Date(),
        data: fileString,
        name: file.name,
      }

//alert(JSON.stringify(ob))

      try {
        //const dbName = 'filesystem-database'
        //const storeName = 'files'
        const db = await openDB(this.state.dbName, dbVersion)

        const trans = db.transaction([this.state.storeName], 'readwrite');
        await trans.store.put(ob, ob.name)

        const dataInDb = await trans.store.get(ob.name)

        this.setupDBState();

        document.querySelector("#image").style = 'border: 1px solid black';
        document.querySelector("#image").src = dataInDb.data;

      //  e.target.value = null;
      } catch (e) {
        console.log('ERROR FILE SAVE', e)
      }
    };

    //reader.readAsDataURL(file);
    //reader.readAsBinaryString(file);
  };

  setupDBState = async (_fileData) => {
    //const dbName = 'filesystem-database'
    //const storeName = 'files'
    const db = await openDB(this.state.dbName, dbVersion)
    await this.setState({
      dbStatus: true,
      files: await db.getAll(this.state.storeName), 
      keys: await db.getAllKeys(this.state.storeName),
    })

    //const fileData = await db.getAll(this.state.storeName)
    //alert(JSON.stringify(Object.keys(fileData)))

    /*
    console.log(_fileData)
    alert(JSON.stringify(_fileData))
    if (_fileData) {
      //const fileData = await db.getAll(this.state.storeName)
      if (this.state.files.length > 0) {
        this.showImageFile(
          this.state.files[0].name,
          0,
        )
      }
    }
    */
  }

  showImageFile = async (_name, _index) => {
    const ob = this.state.files[_index]
    const db = await openDB(this.state.dbName, dbVersion)
    const trans = db.transaction([this.state.storeName], 'readonly');
    const dataInDb = await trans.store.get(ob.name)
console.log('dataInDb', ob)
    document.querySelector("#image").style = 'border: 1px solid black';
    document.querySelector("#image").src = dataInDb.data;

/*
var cleanScript = {
    'type': 'script',
    'api_key': 'api_key',
    'data': 'data',
    'inputs': 'inputs',
    'timeoutSeconds': 'timeoutSeconds'
};
var jsonse = JSON.stringify(cleanScript);
var blob = new Blob([jsonse], {type: "application/json"});
//    var blob = dataInDb.data
    //var url  = URL.createObjectURL(blob);
    console.log({blob})
*/
  }

  updateFiles = async (_files) => {
    try {
      const db = await openDB(this.state.dbName, dbVersion)
      //const table = this.state.storeNameTest
      const table = this.state.storeName
      const trans = db.transaction([table], 'readwrite')
      _files.map(async (file) => {
        console.log("put", file)
        const ob = file
        await trans.objectStore(table).put(ob, ob.name)
        console.log('store.put(ob, ob.name)', ob, table)
        this.setState({ keys: await db.getAllKeys(table) })
        this.setState({ files: await db.getAll(table) })
      })
      console.log(
        'sssssssssssssssssssssssssssss',
        await trans.objectStore(table).get('moon-logo.png')
      )
      //WIP
      alert('added all synced files to ' + this.state.storeNameTest)
    } catch (err) {
      console.error('ERROR :: updateFiles ::', err)
    } 
  }

  deleteFile = async (_name, _index) => {
    const ob = this.state.files[_index]
    const db = await openDB(this.state.dbName, dbVersion)
    const trans = db.transaction([this.state.storeName], 'readwrite');
    console.log(this.state.files)
    console.log(
      'DELETED FILE :: ',
      _name,
    )
    console.log(
      'DELETED FILE RESULT:: ',
      await trans.objectStore(this.state.storeName).delete(ob.name),
    )
    console.log(this.state.files)
    this.setupDBState();
  }
  
  setPhrase = async () => {
    console.log('update sync Phrase:', this.state.form.phrase)
    await this.wallet.setNewPhraseData(this.state.form.phrase)
    await this.setState({ phrase: this.state.form.phrase });
    this.state.form.phrase = ''
    console.log('updated sync Phrase')//, this.state.phrase)
    alert('WIP setPhrase()')
  }

  componentDidUpdate = async () => {
    alert('componentDidUpdate')
  }

  componentDidMount = async () => {
    try {
      this.wallet = new Wallet();
      this.createStoreInDB();
      //this.createStoreInDBNew();
      this.setState({ phrase: await this.wallet.getPhraseData() });
      this.setupDBState();
    } catch (e) {
      console.error('ERROR :: FileUpload :: componentDidMount :: ', e)
    }
  };

  componentDidUpdate = () => {
    //alert("componentDidUpdate")
  }

  render() {
//    if(!this.state.dbStatus) {
//      return (
//        <>
//          db not setup...
//        </>
//      )
//    } else if(this.indexedDBStuff()) {
    if(this.indexedDBStuff()) {
      return (
        <>
          <p>
            Sync Phrase: <b>{ this.state.phrase }</b>
          </p>
          <p>
            <button onClick={() => this.setPhrase()}>update</button>
            <input type="text" ref={this.state.form.phrase} onChange={(event) => {
              this.state.form.phrase = event.target.value
              console.log('phrase input onClick event.target.value:', event.target.value, this.state.form.phrase)
            }} />
          </p>
          <p>Sync Listen: 
            <b>{ this.state.listening }</b>
            <input type="button" id="listenSwitch" value="off" onClick={this.handleListenClick}/>
          </p>
          <p>Sync Latest: 
            <input type="button" id="latestSwitch" value="get" onClick={this.handleLatestClick}/>
          </p>

          <p><img id="image"/></p>
          FileUpload Input: <input type="file"
                                   key={Math.random().toString(36)}
                                   onChange={this.handleFileUpload} />
          <ul>
            {this.state.keys.map((name, index) => {
              return (<li>
                <button onClick={() => this.showImageFile(name, index)}>show {name}</button>
                <button onClick={() => this.deleteFile(name, index)}> x </button>
              </li>)
            })}
          </ul>
        </>
      );
    } else {
      return (
        <>
          FileUpload IndexedDB not available in this browser 
        </>
      );
    }
  }
}

export default FileUpload
