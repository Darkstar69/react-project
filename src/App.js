import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import Notfound from "./components/Notfound";
import ForgetPass from "./components/ForgetPass";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import { CartProvider } from "react-use-cart";


function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Landing} />
            <Route path="/home" Component={Home} />
            <Route path="/contact" Component={Contact} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path="/profile" Component={Profile} />
            <Route path="/about" Component={AboutUs} />
            <Route path="/cart" Component={Cart} />
            <Route path="/orders" Component={Orders} />
            <Route path="/forgotpass" Component={ForgetPass} />
            <Route path="*" Component={Notfound} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
