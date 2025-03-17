import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <div className="bg-dark text-secondary px-4 py-5 text-center">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">Get in Touch</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">
              Have questions or need assistance? We’re here to help! Reach out
              to us for inquiries about our{" "}
              <b>Men’s Fashion, Women’s Fashion,</b> and <b>Jewelry</b>{" "}
              collections.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to="/contact"
                className="btn btn-outline-light btn-lg px-4"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
