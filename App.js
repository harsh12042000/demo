import './App.css';
import Headers from './components/Headers'
import Home from './modules/Home';
import { Register, Signin } from './modules/Account';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ProductScreen from './components/Products/ProductScreen';
import Shipping from './components/Policys/shipping';
import { Footer } from './components/Footer';
import Privacy from './components/Policys/privacy';
import { Products } from './components/Products';
import ContactUs from './components/Contact';
import { AboutUs } from './components/AboutUs';
import CartScreen from './components/CartScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Headers/>
        <Routes>
          <Route path='/product/:slug' element={<ProductScreen/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/privacy/shipping' element={<Shipping/>}></Route>
          <Route path='/privacy/policy' element={<Privacy/>}></Route>

          {/* temp */}
          {/* <Route path='/category/:slug' element={<Products/>}></Route> */}

          <Route path='/contactus' element={<ContactUs/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/signup' element={<Register/>}></Route>
          <Route path='/aboutus' element={<AboutUs/>}></Route>
          <Route path='/cart' element={<CartScreen/>}></Route>
        </Routes>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
