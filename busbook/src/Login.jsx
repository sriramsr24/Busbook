
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [profiles, setProfiles] = useState([]); // All profiles from DB
  const [formData, setFormData] = useState({ username: "", password: "" }); // Login form input

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/profile')
      .then(response => {
        setProfiles(response.data);
      })
      .catch(err => {
        console.error("Error fetching profiles:", err);
      });
  }, []);

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    const user = profiles.find(p => p.username === formData.username);

    if (!user) {
      alert("Username does not exist.");
    } else if (user.password !== formData.password) {
      alert("Incorrect password.");
    } else {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // ✅ Save full user
      setFormData({ username: "", password: "" });
      navigate("/home");
    }
  }

  return (
   < div className='login-page'>
    <div className="container" >
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <div className="card p-4  w-100 login-div mt-5" style={{ maxWidth: "400px" }}>
          <form onSubmit={handleLogin}>
            <h2 className="text-center mb-4">Login</h2>
            <input
              onChange={handleInputChange}
              value={formData.username}
              type="text"
              placeholder="Username"
              name="username"
              className="form-control mb-3"
              required
            />
            <input
              onChange={handleInputChange}
              value={formData.password}
              type="password"
              placeholder="Password"
              name="password"
              className="form-control mb-3"
              required
            />

            <button type="submit" className="btn btn-success w-100 mb-2">
              Login
            </button>

            <div className="text-center">
              <Link to="/register" style={{ color: "blue", textDecoration: "none" }}>
                New user? Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>  
  );
}

export default Login;
