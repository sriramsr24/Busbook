
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [user, setUser] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    navigate("/");
  };

  const handleAboutClick = () => {
    setShowAbout(!showAbout);
    setEditMode(false);
    setChangePasswordMode(false);
  };

  const handleEditToggle = () => {
    setEditMode(true);
    setChangePasswordMode(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/profile/${formData.id}`, formData);
      alert("User updated successfully!");
      localStorage.setItem("loggedInUser", JSON.stringify(formData));
      setUser(formData);
      setEditMode(false);
    } catch (error) {
      alert("Error updating user.");
      console.error(error);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!newPassword) return alert("Please enter a new password");

    try {
      const updatedUser = { ...user, password: newPassword };
      await axios.put(`http://localhost:3000/profile/${user.id}`, updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setNewPassword("");
      setChangePasswordMode(false);
      alert("Password updated successfully!");
    } catch (err) {
      console.error("Error updating password:", err);
      alert("Failed to update password.");
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg p-3   sticky-top" style={{backgroundColor : "#e3f2fd"}} data-bs-theme="light">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">BUSBOOKING</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/busroot" className="nav-link">BusRoutes</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleAboutClick}>About</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="home-page mt-5">
        
      {/* Welcome */}
      <div className="container mt-5 text-center " style={{color:"whitesmoke"}}>
        <h2>Welcome, {user?.username}!</h2>
      </div>

      {/* About Section */}
      {showAbout && user && (
        <div className="container mt-5 mb-5">
          <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
            <h4 className="mb-4 text-center">User Details</h4>

            {/* View Mode */}
            {!editMode && !changePasswordMode && (
              <>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Register Number:</div>
                  <div className="col-6 text-start">{user.id}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Name:</div>
                  <div className="col-6 text-start">{user.username}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Year:</div>
                  <div className="col-6 text-start">{user.Year}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Department:</div>
                  <div className="col-6 text-start">{user.department}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Age:</div>
                  <div className="col-6 text-start">{user.age}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Mobile:</div>
                  <div className="col-6 text-start">{user.mobile}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Email:</div>
                  <div className="col-6 text-start">{user.email}</div>
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn-primary me-2" onClick={handleEditToggle}>Edit Info</button>
                  <button className="btn btn-warning" onClick={() => setChangePasswordMode(true)}>Change Password</button>
                </div>
              </>
            )}

            {/* Edit Mode */}
            {editMode && (
              <form onSubmit={handleUpdate}>
                {["username", "Year", "department", "age", "mobile", "email"].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">{field}</label>
                    <input
                      type={field === "age" || field === "mobile" ? "number" : "text"}
                      name={field}
                      className="form-control"
                      value={formData[field]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
                <div className="text-center">
                  <button className="btn btn-success me-2" type="submit">Update</button>
                  <button className="btn btn-secondary" type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </form>
            )}

            {/* Password Change Mode */}
            {changePasswordMode && (
              <form onSubmit={handlePasswordUpdate}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-success me-2" type="submit">Update Password</button>
                  <button className="btn btn-secondary" type="button" onClick={() => setChangePasswordMode(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Home;



//npx json-server --watch db/db.json --port 3000 --static ./data