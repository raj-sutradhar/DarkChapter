import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {  Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Addbook from "./pages/Addbook";
import Allorders from "./pages/Allorders";
import BookDetails from "./components/Bookdetails/BookDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import Favourite from "./components/Profile/Favourite";
import Userorder from "./components/Profile/Userorder";
import Settings from "./components/Profile/Settings";

function App() {
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);
  useEffect(()=>{
    if(localStorage.getItem("id")&& localStorage.getItem("token") && localStorage.getItem("role")){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[])
  return (
    <div className="bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourite />} />
          ) : (
            <Route index element={<Allorders />} />
          )}
          {role === "admin" && (
            <Route path="/profile/addbook" element={<Addbook />} />
          )}
          <Route path="/profile/orders" element={<Userorder />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/bookdetails/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
