import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Page404 from "../pages/Page404";
//scss file
import "../assets/scss/App.scss";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/cart' element={<Cart />}></Route>
          <Route path='*' element={<Page404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
