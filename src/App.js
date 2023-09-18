import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/SignUp';
import { useSelector } from 'react-redux';
import NewProduct from './Pages/NewProduct/NewProduct';

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          {!user && <>
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>}
          <Route path='/new_product' element={<NewProduct />} />
          <Route path="*" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
