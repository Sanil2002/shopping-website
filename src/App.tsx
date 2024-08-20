// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './Pages/Home';
import { About } from './Pages/About';
import Store from './Pages/Store';
import { Navbar } from './Components/Navbar';
import Singleproduct from './Pages/Singleproduct';
// import { Shoppingcartprovider } from './Context/Shoppingcartcontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';
import Cart from './Components/Cart';
import CheckoutSuccess from './Pages/Checkout';
import Profile from './Pages/Profile';
import Update from './Pages/Update';
import { addProducts, initDB } from './Utilities/db';
import { useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Pages/Dashboard';
import { Footer } from './Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useAuth0 } from '@auth0/auth0-react';
import getCartItemsFromLocalStorage from './Utilities/getCart';
import saveCartItemsToLocalStorage from './Utilities/saveCart';
import { setCartItems } from './features/cartSlice';
import { Comments } from './Components/Comments';
import Orders from './Pages/Orders';
import OrderConfirmation from './Pages/OrderConfirmation';
// import { useAuth0 } from '@auth0/auth0-react';
// import { setupStore } from './app/store';

const App = () => {

const {user, isAuthenticated } = useAuth0();
const dispatch = useDispatch();
  //................................................................


  useEffect(() => {
    const fetchAndStoreProducts = async () => {
      const db = await initDB();
      const cachedProducts = await db.getAll('products');

      if (true) {
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          const products = response.data;
          console.log("app.tsx",products)
          await addProducts(db, products);                                                                             // Store fetched products in IndexedDB
          console.log('Products stored in IndexedDB');
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        console.log('Using cached products from IndexedDB');
        console.log(cachedProducts)
      }
    };

    fetchAndStoreProducts();
  }, []);


  // ...............................................................
  
  const cartItems = useSelector((state: RootState) => state.cart.items || []);
  //--------------------------------------------UseEffects for persistent Cart--------------------------------------------------
  //Get cart Items from localstorage
  useEffect(() => {
    if (user?.email) {
      let storedCarts = getCartItemsFromLocalStorage(user.email);
      storedCarts = Array.isArray(storedCarts) ? storedCarts : [];
      console.log("storedcarts", storedCarts);
      dispatch(setCartItems(storedCarts));
    }
  }, [isAuthenticated, user?.email, dispatch]);
  
  //store Cart Items whenever the cartItems change
  useEffect(() => {
    if (user?.email) {
      
      saveCartItemsToLocalStorage(user.email, cartItems);
    }
  }, [cartItems, user?.email]);
//--------------------------------------------------------------------------------------------

  return (<>
    {/* <Shoppingcartprovider> */}
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Store" element={<Store />} /> */}
          <Route path="/About" element={<About />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/OrderConfirmation" element={<OrderConfirmation/>} />
        </Routes>
        <Cart />
      </Container>
      <Routes>
      <Route path="/Store/:id" element={<Singleproduct />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/Update" element={<Update/>} />
      <Route path="/Comments" element={<Comments />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/checkout" element={<CheckoutSuccess/>} />
      </Routes>
      <Footer />
    {/* </Shoppingcartprovider> */}
    </>);
};

export default App;
