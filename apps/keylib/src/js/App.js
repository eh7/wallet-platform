// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';

const App = () => {
 return (
    <>
       <Routes>
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
