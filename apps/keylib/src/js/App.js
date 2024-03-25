// App.js
import { Routes, Route } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavMain from './components/Nav/Main';

import Home from './pages/Home';
import About from './pages/About';
import Applications from './pages/Applications';
import SendTx from './pages/Send';

import ConfNetwork from './pages/Conf/Network';
//import LocalStorage from './components/Conf/LocalStorage';
import LocalStorage from './components/Form/LocalStorage';

import Setup from './pages/Setup';
import SetupAddress from './pages/SetupAddress';
import SetupPhrase from './pages/SetupPhrase';
import SetupPassword from './pages/SetupPassword';
import SetupPhraseImport from './pages/SetupPhrase';
import SetupSeed from './pages/SetupSeed';
import SetupImportKeystore from './pages/SetupImportKeystore';
import SetupExportKeystore from './pages/SetupExportKeystore';
import SetupExportData from './pages/SetupExportData';
import SetupImportData from './pages/SetupImportData';
import SetupLoadKeystore from './pages/SetupLoadKeystore';

//import Network from '/components/Conf/Network'; 

import AllABI from './pages/AllABI';

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  /*
  const setTitle = () => {
    console.log('zzzzzzzzzzzzzzzzzzzzz', window.location.pathname);
    document.title = "testing";
  }  

  setTitle();
  alert(1234);
  */

  const liveNetworks = JSON.parse(localStorage.getItem("networks"));
  const liveNetwork = JSON.parse(localStorage.getItem("network"));

  //console.log('xxxxxxxxxxxxxxxxxx', typeof liveNetworks);
  //console.log('xxxxxxxxxxxxxxxxxx', liveNetwork, Object.keys(liveNetworks || {}).length);
//  return (
//    <>
//      <Container>
//        <Row><h1>LocalStorage</h1></Row>
//        <Row><LocalStorage/></Row>
//      </Container>
//    </>
//  );

  if (Object.keys(liveNetworks || []).length === 0) {
    //alert('Nav/Main no live networks - direct to network setup')
    return (
      <>
        <Container>
          <Row><h1>Configure Networks</h1></Row>
          <Row className="p-3">
            <h5>no "networks" data detected</h5>
            <h6>setup your default "networks" data</h6>
            <ConfNetwork type='init'/>
          </Row>
        </Container>
      </>
    );
  }
  if (Object.keys(liveNetwork || {}).length === 0) {
    console.log('yyyyxxxxxxxxxx', liveNetworks[0]);
//    alert('Nav/Main no live network - direct to network setup')
    localStorage.setItem(
      'network',
      JSON.stringify(
        liveNetworks[0]
      )
    );
/*
    return (
      <>
        <h5>no "network" data detected</h5>
        <h6>setup your default "network" data</h6>
      </>
    );
*/
  }


  return (
    <>
       <NavMain/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Applications" element={<Applications />} />

          <Route path="/contract/ballot" element={<AllABI contractName="Ballot" />} />
          <Route path="/contract/ballotDev" element={<AllABI contractName="BallotDev" />} />
          <Route path="/contract/eh7token" element={<AllABI contractName="Eh7Token" />} />
          <Route path="/contract/etherWallet" element={<AllABI contractName="EtherWallet" />} />

          <Route path="/send" element={<SendTx />} /> 
          <Route path="/config/network" element={<ConfNetwork />} /> 
          <Route path="/setup" element={<Setup />} /> 
          <Route path="/setup/address" element={<SetupAddress />} /> 
          <Route path="/setup/export/data" element={<SetupExportData />} /> 
          <Route path="/setup/import/data" element={<SetupImportData />} /> 
          <Route path="/setup/password" element={<SetupPassword _new={true}/>} /> 
          <Route path="/setup/phrase" element={<SetupPhrase _new={true}/>} /> 
          <Route path="/setup/phrase/import" element={<SetupPhrase _new={false} />} /> 
          <Route path="/setup/seed" element={<SetupSeed />} /> 
          <Route path="/setup/import/keystore" element={<SetupImportKeystore />} /> 
          <Route path="/setup/export/keystore" element={<SetupExportKeystore />} /> 
          <Route path="/setup/keystore/load" element={<SetupLoadKeystore />} /> 
          <Route path="/setup/localStorage" element={<LocalStorage />} /> 
       </Routes>
    </>
 );
};
//          <Route path="/products" element={<Applications />} />
//          <Route path="/about" element={<About />} />

export default App;
