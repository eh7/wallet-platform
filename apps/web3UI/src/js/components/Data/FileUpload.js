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
    };

    this.dbName = 'filesystem-database'
    this.storeName = 'files'
    //console.log('this.wallet', this.wallet)
  }

  createStoreInDB = async () => {
    try {
      //const dbName = 'Test-Databaset'
      const dbName = 'filesystem-database'
      const storeName = 'files'
      //const dbPromise = openDB('keyval-store2', 1, {
      const dbPromise = openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore(storeName);
          //this.setState({ keys: await db.getAllKeys(storeName) });
          //this.setState({ files: await db.getAll(storeName) });
          //this.db = db;
          //createStoreInDB()
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

  //useDB = async () => {
  //  // Returns a promise, which makes `idb` usable with async-await.
  //  //const dbPromise = await openDB('example-database', version, events);
  //  const dbPromise = await openDB('test-db1', 1)
  //}

  createStoreInDBOld = async () => {

/*
    const dbPromise = await openDB('filesystem-database', 1, {
      upgrade (db) {
        // Creates an object store:
        //db.createObjectStore('storeName', options);

        console.log('Creating a new object store...');
        // Checks if the object store exists:
        if (!db.objectStoreNames.contains('files')) {
          // If the object store does not exist, create it:
          return db.createObjectStore('files')
        } 
        //return db.objectStoreNames.contains('files')
      }
    });
*/

    try {
      this.setState({ phrase: await this.wallet.getNewPhraseData() });
      console.log("phrase:", this.state.phrase);
      /*
      const dbName = 'Test-Database'
      */
      const dbName = 'filesystem-database'
      const storeName = 'files'
      const db = await openDB(dbName, 1)
      //const db = this.db
      //await db.createObjectStore(storeName);
      this.setState({ keys: await db.getAllKeys(storeName) })
      this.setState({ files: await db.getAll(storeName) })
      //this.setState({ keys: await db.getAll(storeName) })
      console.log('keys', this.state.keys)
      console.log('files', this.state.files)
    } catch (e) {
      console.error("ERROR CATCH :: createStoreInDB :: ", e)
    }
  }

  //const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
  //      IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
  //      dbVersion = 1.0;
 
  handleListenClick = (event) => {
    let value = document.querySelector('#listenSwitch').value;
    if (document.querySelector('#listenSwitch').value === 'off') {
      document.querySelector("#listenSwitch").value = "on";
      console.log("WIP ::  initiate publishing of latest files data on REST API or p2p broadcast")
    } else {
      document.querySelector("#listenSwitch").value = "off";
      console.log("WIP ::  p2p signoff and halt publishing of latest files data")
    }
    /*
    console.log('SSSSSSSXXXXXXXXXXX', 
      document.getElementById('listenSwitch'),
    )
    alert('handleListenClick')
    */
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

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
        //name: file.name,getAllKeys
      }

      try {
        const dbName = 'filesystem-database'
        //const dbName = 'Test-Database'
        const storeName = 'files'
        const db = await openDB(dbName, 1)

        //const db = this.db

//console.log(storeName)
//console.log(db.transaction(storeName, 'readwrite'))
        const trans = db.transaction([storeName], 'readwrite');
        await trans.store.put(ob, ob.name)

        const dataInDb = await trans.store.get(ob.name)
        console.log('SSSSSSSSSSSSSS dataInDb ::: ', dataInDb.name, dataInDb)
        //alert('dataInDb.name:' + dataInDb.name)

        this.setupDBState();

        document.querySelector("#image").style = 'border: 1px solid black';
        document.querySelector("#image").src = dataInDb.data;

      } catch (e) {
        console.log('ERROR FILE SAVE', e)
      }
    };

    reader.readAsDataURL(file);
    //reader.readAsBinaryString(file);
  };

  setupDBState = async () => {
    const dbName = 'filesystem-database'
    const storeName = 'files'
    const db = await openDB(dbName, 1)
    this.setState({
      dbStatus: true,
      files: await db.getAll(storeName), 
      keys: await db.getAllKeys(storeName),
    })
  }

  componentDidMount = async () => {
    this.wallet = new Wallet();
    this.createStoreInDB();
    this.setState({ phrase: await this.wallet.getPhraseData() });
    this.setupDBState();
    //console.log("phrase:", this.state.phrase);
/*
    const dbName = 'filesystem-database'
    const storeName = 'files'
    const db = await openDB(dbName, 1)
    this.setState({
      dbStatus: true,
      files: await db.getAll(storeName), 
      keys: await db.getAllKeys(storeName),
    })
*/
  };

  //componentWillUpdate(object nextProps, object nextState)

  //componentDidUpdate(object prevProps, object prevState)
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
      //this.useDB()
      return (
        <>
          <p>Sync Phrase: <b>{ this.state.phrase }</b></p>
          <p>Sync Listen: 
            <b>{ this.state.listening }</b>
            <input type="button" id="listenSwitch" value="off" onClick={this.handleListenClick}/>
          </p>

          <p><img id="image"/></p>
          FileUpload Input: <input type="file" onChange={this.handleFileUpload} />
          <ul>
            {this.state.keys.map((name, index) => {
              return (<li>
                <button onClick={async () => {
                  const dbName = 'filesystem-database'
                  //const dbName = 'Test-Databaset'
                  const storeName = 'files'
                  const ob = this.state.files[index]
                  const db = await openDB(dbName, 1)
                  const trans = db.transaction([storeName], 'readonly');
                  const dataInDb = await trans.store.get(ob.name)
                  document.querySelector("#image").style = 'border: 1px solid black';
                  document.querySelector("#image").src = dataInDb.data;
                  //console.log(Object.keys(this.state.files[index]))
                  //alert(this.state.files[index].name)
                }}>{name}</button>
                <button onClick={async () => {
                  const dbName = 'filesystem-database'
                  //const dbName = 'Test-Databaset'
                  const storeName = 'files'
                  const ob = this.state.files[index]
                  const db = await openDB(dbName, 1)
                  const trans = db.transaction([storeName], 'readwrite');
                  //const del = await trans.store.delete('name', ob.name)
                  //let del = await trans.objectStore(storeName).delete(index);
                  console.log(this.state.files)
                  console.log(
                    'xxxxxxxxxxxx DELETED ::::::::',
                    await trans.objectStore(storeName).delete(ob.name),
                    await db.getAll(storeName),
                    //await trans.objectStore(storeName).get(ob.name),
                    //await trans.store.getAll(),
                    //del
                  //  await db.delete(storeName, index)
                  )
                  this.setupDBState();
                  console.log(this.state.files)
                  alert('delete ' + this.state.files[index].name)
                  this.setState({ files: await db.getAll(storeName) })
                }}> x </button>
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

export default FileUpload;
