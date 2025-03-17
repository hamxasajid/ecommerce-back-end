import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="bg-dark text-secondary px-4 py-5 text-center">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">About Us</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">
              At <b>YourStore</b>, we believe fashion is more than just
              clothing—its a statement. We offer a wide range of{" "}
              <b>Men Fashion, Women Fashion,</b> and <b>Jewelry</b> to help
              you express yourself effortlessly.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
