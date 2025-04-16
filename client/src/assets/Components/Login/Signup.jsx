import { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        window.location.href = "/sigin"; // Use your actual route
      } else {
        alert(`Signup failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm bg-light"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-start w-100">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-start w-100">
                Email (must be unique)
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact" className="form-label text-start w-100">
                Contact Number (must be unique)
              </label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-start w-100">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label text-start w-100">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Sign Up
            </button>

            {/* 👇 Added login link */}
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/sigin" className="text-decoration-none">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
