// App.js
import { Routes, Route } from 'react-router-dom';
import Setup from './pages/Setup';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import NavMain from './components/NavMain';

const App = () => {
 return (
    <>
       <NavMain/>
       <Routes>
          <Route path="/setup" element={<Setup />} /> 
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
       </Routes>
    </>
 );
};
//          <Route path="/products" element={<Products />} />
//          <Route path="/about" element={<About />} />

export default App;
