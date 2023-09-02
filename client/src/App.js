import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/User/Dashboard';
import { PrivateRoute } from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import {AdminPrivateRoute} from './components/Routes/AdminPrivateRoute'
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
// import Orders from './pages/User/Orders';
import Shop from './pages/shop/Shop';
import Cart from './pages/cart/Cart';
import Orders from './pages/Admin/Orders';
import UserOrders from './pages/User/UserOrders';
import OrderInfo from './pages/Supplier/OrderInfo';
import OrderInfoShipping from './pages/Supplier/OrderInfoShipping';
import OrderShipped from './pages/Supplier/OrderShipped';
import ErrorPage from './pages/errorPage/ErrorPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<UserOrders />} />
        </Route>

        <Route path='/dashboard' element={<AdminPrivateRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/create-product' element={<CreateProduct/>}/>
          <Route path='admin/orders' element={<Orders/>}/>
        </Route>

        <Route path='supplier/order-info' element={<OrderInfo/>}/>
        <Route path='supplier/order-info-shipping' element={<OrderInfoShipping/>}/>
        <Route path='supplier/order-info-shipped' element={<OrderShipped/>}/>

        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Shop />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
