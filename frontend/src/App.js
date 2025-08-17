import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/Orders/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReview from "./components/Admin/ProductReview";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/Not Found/NotFound";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import { clearErrors, loadUser } from "./actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./App.css";

function App() {
  const [first, setFirst] = useState(1);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/payment/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    if (!first && error) {
      dispatch(clearErrors());
    }

    if (first) {
      store.dispatch(loadUser());
      setFirst(0);
    }

    if (isAuthenticated) {
      getStripeApiKey();
    }
  }, [error, dispatch, first, isAuthenticated]);

  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/signup" element={<LoginSignUp />} />
        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/me/update" element={<UpdateProfile />} />
        <Route exact path="/me/updatePassword" element={<UpdatePassword />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/success" element={<OrderSuccess />} />
        <Route exact path="/orders" element={<MyOrders />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact path="/orders/:id" element={<OrderDetails />} />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/products" element={<ProductList />} />
        <Route exact path="/admin/product" element={<NewProduct />} />
        <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        <Route exact path="/admin/orders" element={<OrderList />} />
        <Route exact path="/admin/orders/:id" element={<ProcessOrder />} />
        <Route exact path="/admin/users" element={<UsersList />} />
        <Route exact path="/admin/users/:id" element={<UpdateUser />} />
        <Route exact path="/admin/reviews" element={<ProductReview />} />
        <Route
          exact
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />
      </Routes>

      {stripeApiKey.length > 0 && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}

      <Footer />
    </Router>
  );
}

export default App;
