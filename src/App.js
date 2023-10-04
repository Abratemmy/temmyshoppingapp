import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/SignUp';
import { useSelector } from 'react-redux';
import NewProduct from './Pages/NewProduct/NewProduct';
import ProductDetail from './Pages/ProductPage/ProductDetail';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import ScrollToTop from './components/ScrollToTop';
import CartPage from './Pages/CartPage/CartPage';
import OrderPage from './Pages/Orders/OrderPage';

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          {!user && <>
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>}

          {user && (
            <>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrderPage />} />
            </>
          )}
          <Route path='/new_product' element={<NewProduct />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/category/:category' element={<CategoryPage />} />

          <Route path="*" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
