// App.js
import { Routes, Route } from 'react-router-dom';

import NavMain from './components/Nav/Main';

import Home from './pages/Home';
import About from './pages/About';
import Applications from './pages/Applications';
import SendTx from './pages/Send';

import ConfNetwork from './pages/Conf/Network';

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

  return (
    <>
       <NavMain/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Applications" element={<Applications />} />
          <Route path="/contract/ballot" element={<AllABI contractName="Ballot" />} />
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
       </Routes>
    </>
 );
};
//          <Route path="/products" element={<Applications />} />
//          <Route path="/about" element={<About />} />

export default App;
