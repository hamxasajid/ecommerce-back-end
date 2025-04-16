import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./assets/Components/Nav";
import Home from "./assets/Components/Home";
import About from "./assets/Components/About";
import Contact from "./assets/Components/Contact";
import Products from "./assets/Components/Products";
import AllProducts from "./assets/Components/SubComponenet/AllProducts";
import Footer from "./assets/Components/Footer";
import Details from "./assets/Components/SubComponenet/Details";
import Checkout from "./assets/Components/SubComponenet/Checkout";
import SearchResults from "./assets/Components/SearchResults";
import CategoryProducts from "./assets/Components/SubComponenet/CategoryProducts";
import Signin from "./assets/Components/Login/Signin";
import Signup from "./assets/Components/Login/Signup";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loader on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // You can adjust the delay if needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />}>
              <Route index element={<AllProducts />} />
              <Route
                path="/products/:category"
                element={<CategoryProducts />}
              />
            </Route>
            <Route path="/productdetails/:productId" element={<Details />} />
            <Route path="/cart" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search_result" element={<SearchResults />} />
            <Route path="/sigin" element={<Signin />} />
            <Route path="/sigup" element={<Signup />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
