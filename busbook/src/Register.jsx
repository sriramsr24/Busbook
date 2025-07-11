
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    password: "",
    Year: "",
    department: "",
    age: "",
    mobile: "",
    email: ""
  });

  const navigate = useNavigate();

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/profile', formData);
      alert('Registration successful!');
      localStorage.setItem("loggedInUser", JSON.stringify(formData));
      navigate("/home");
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Error during registration.");
    }
  }

  return (
  <div className='register-page'>
    <div className="container mt-5 ">
      <div className="card shadow-lg p-4 ">
       
          <form onSubmit={handleRegister}>
          <h2 className="text-center mb-4">Register</h2>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Register Number" name="id" value={formData.id} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <select className="form-select" name="Year" value={formData.Year} onChange={handleInputChange} required>
              <option value="">Choose Your Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="mb-3">
            <select className="form-select" name="department" value={formData.department} onChange={handleInputChange} required>
              <option value="">Choose Your Department</option>
              <option value="BE.CSE">BE.CSE</option>
              <option value="BE.ECE">BE.ECE</option>
              <option value="BE.EEE">BE.EEE</option>
              <option value="BE.MECH">BE.MECH</option>
              <option value="BE.CIVIL">BE.CIVIL</option>
            </select>
          </div>
          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Age" name="age" value={formData.age} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Mobile Number" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
          <div className="mt-3 text-center">
            <Link to="/" className="text-decoration-none">Already have an account?</Link>
          </div>
        </form>
        
      </div>
    </div>
  </div>
  );
}

export default Register;