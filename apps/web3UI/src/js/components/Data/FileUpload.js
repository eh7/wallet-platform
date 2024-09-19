import React from 'react';
import {openDB} from 'idb';
import * as indexedDB from 'idb';

import Wallet from '../../services/wallet';

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      files: [],
      pharse: '',
      dbStatus: false,
      listening: false,
      dbName: 'filesystem-database',
      storeName: 'files',
    };

  }

  createStoreInDB = async () => {
    try {
      const dbName = 'filesystem-database'
      const storeName = 'files'
      const dbPromise = openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore(storeName);
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
      const db = await openDB(dbName, 1)
      this.setState({ keys: await db.getAllKeys(storeName) })
      this.setState({ files: await db.getAll(storeName) })
      console.log('keys', this.state.keys)
      console.log('files', this.state.files)
    } catch (e) {
      console.error("ERROR CATCH :: createStoreInDB :: ", e)
    }
  }

  handleListenClick = (event) => {
    try {
      let value = document.querySelector('#listenSwitch').value;
      if (document.querySelector('#listenSwitch').value === 'off') {
        document.querySelector("#listenSwitch").value = "on";
        this.syncSwitchOn()
        console.log("WIP ::  initiate publishing of latest files data on REST API or p2p broadcast")
      } else {
        document.querySelector("#listenSwitch").value = "off";
        this.syncSwitchOff()
        console.log("WIP ::  p2p signoff and halt publishing of latest files data")
      }
    } catch (e) {
      console.error(':: handleListenClick ERROR :: ', e)
      alert(':: handleListenClick ERROR :: ' +  e.message)
    }
  }

  syncSwitchOn = (event) => {
    console.log('files', this.state.files)
    const encryptedFilesData = this.wallet.encryptFilesData(
      this.state.files,
      this.state.phrase,
    )
    console.log('encryptedFilesData', encryptedFilesData);
    console.log(JSON.stringify(encryptedFilesData))

    const decryptedFilesData = this.wallet.decryptFilesData(
      encryptedFilesData,
      this.state.phrase,
    )
    console.log('decryptedFilesData', decryptedFilesData);
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
        const db = await openDB(this.state.dbName, 1)

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
    const db = await openDB(this.state.dbName, 1)
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
    const db = await openDB(this.state.dbName, 1)
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

  deleteFile = async (_name, _index) => {
    const ob = this.state.files[_index]
    const db = await openDB(this.state.dbName, 1)
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
  

  componentDidMount = async () => {
    try {
      this.wallet = new Wallet();
      this.createStoreInDB();
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
    if(!this.state.dbStatus) {
      return (
        <>
          db not setup...
        </>
      )
    } else if(this.indexedDBStuff()) {
      return (
        <>
          <p>Sync Phrase: <b>{ this.state.phrase }</b></p>
          <p>Sync Listen: 
            <b>{ this.state.listening }</b>
            <input type="button" id="listenSwitch" value="off" onClick={this.handleListenClick}/>
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
