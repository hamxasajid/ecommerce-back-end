import React from "react";
import Nav from "./Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./component/AddProduct";
import Home from "./component/Home";
import AllProducts from "./component/AllProducts";
import Update from "./component/Update";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        {/* Add your routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
