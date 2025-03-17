import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* About Section - Align Left */}
          <div className="col-md-4 text-start">
            <h5>About Us</h5>
            <p>
              We offer the latest trends in <b>Men Fashion, Women Fashion,</b>{" "}
              and <b>Jewelry.</b> Experience quality and style like never
              before.
            </p>
          </div>

          {/* Quick Links - Align Left */}
          <div className="col-md-4 text-center">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-light text-decoration-none"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Align Left */}
          <div className="col-md-4 text-start">
            <h5>Contact Us</h5>
            <p>
              Email:{" "}
              <a href="mailto:hamxadevx@gmail.com" className="text-light">
                hamxadevx@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:03038610048" className="text-light">
                0303-8610048
              </a>
            </p>
            <p>Location: Faisalabad, Pakistan</p>
          </div>
        </div>

        <hr className="bg-light" />

        {/* Social Media & Copyright - Centered */}
        <div className="text-center">
          <p>© 2024 Your Brand Name. All Rights Reserved.</p>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
