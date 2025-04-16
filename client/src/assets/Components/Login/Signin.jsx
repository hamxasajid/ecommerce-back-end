import { useState } from "react";
import { Link } from "react-router-dom"; // if using React Router

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Login successful!");
        window.location.href = "/cart";
      } else {
        alert(data.message || "Invalid email or password");
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
          <h2 className="text-center mb-4">Login</h2>
          <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm bg-light"
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-start w-100">
                Email address
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
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/sigup" className="text-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
