import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./assets/Components/Nav";
import Home from "./assets/Components/Home";
import About from "./assets/Components/About";
import Contact from "./assets/Components/Contact";
import Products from "./assets/Components/Products";
import Men from "./assets/Components/SubComponenet/Men";
import Women from "./assets/Components/SubComponenet/Women";
import AllProducts from "./assets/Components/SubComponenet/AllProducts";
import Jewelry from "./assets/Components/SubComponenet/Jewelry";
import Footer from "./assets/Components/Footer";
import Details from "./assets/Components/SubComponenet/Details";
import Checkout from "./assets/Components/SubComponenet/Checkout";
import SearchResults from "./assets/Components/SearchResults";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />}>
              <Route index element={<AllProducts />} />
              <Route path="/products/men-fashion" element={<Men />} />
              <Route path="/products/women-fashion" element={<Women />} />
              <Route path="/products/jewelry" element={<Jewelry />} />
            </Route>
            <Route path="/productdetails/:productId" element={<Details />} />
            <Route path="/cart" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search_result" element={<SearchResults />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
