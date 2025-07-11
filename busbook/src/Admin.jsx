// export default Admin;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load all users
    axios.get("http://localhost:3000/profile") // ✅ Make sure your db.json uses 'profile' not 'profiles'
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));

    // Load all bookings
    axios.get("http://localhost:3000/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  const verifyUser = async (user) => {
    try {
      await axios.put(`http://localhost:3000/profile/${user.id}`, {
        ...user,
        verified: true
      });
      setUsers(prev =>
        prev.map(u => u.id === user.id ? { ...u, verified: true } : u)
      );
      alert(`${user.username} has been verified ✅`);
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  return (
    <div className='admin'>
    <div className="container my-5">
      <h2 className="mb-4 text-center" style={{color:"whitesmoke"}}>All Users & Their Bookings</h2>
      <div className="row">
        {users.map(user => {
          const userBookings = bookings.filter(b => b.userId === user.id);

          return (
            <div className="col-md-6 mb-4" key={user.id}>
              <div className="card shadow p-3">
                <h5 className="text-primary">{user.username}</h5>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Department:</strong> {user.department}</p>
                <p><strong>Year:</strong> {user.Year}</p>
                <p><strong>Status:</strong> {user.verified ? "✅ Verified" : "❌ Not Verified"}</p>

                {!user.verified && (
                  <button className="btn btn-sm btn-success mb-3" onClick={() => verifyUser(user)}>
                    Verify
                  </button>
                )}

                <div>
                  <h6 className="mt-3">Bookings:</h6>
                  {userBookings.length === 0 ? (
                    <p className="text-muted">No bookings found.</p>
                  ) : (
                    userBookings.map(booking => (
                      <div key={booking.id} className="border rounded p-2 mb-2">
                        <p><strong>Route:</strong> {booking.routeFrom} → {booking.routeTo}</p>
                        <p><strong>Distance:</strong> {booking.distance}</p>
                        <p><strong>Fare:</strong> {booking.fare}</p>
                        <p><strong>Time:</strong> {new Date(booking.timestamp).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>  
  );
}

export default Admin;
