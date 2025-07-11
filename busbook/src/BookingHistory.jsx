import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setUsername(user.username);
      axios
        .get(`http://localhost:3000/bookings?userId=${user.id}`)
        .then((res) => setHistory(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, []);

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center">Booking History for {username}</h3>
      {history.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="row">
          {history.map((b) => (
            <div key={b.id} className="col-md-4 mb-3">
              <div className="card shadow-sm p-3">
                <h5 className="text-primary">{b.routeFrom} → {b.routeTo}</h5>
                <p><strong>Distance:</strong> {b.distance}</p>
                <p><strong>Fare:</strong> {b.fare}</p>
                <p><strong>Booked on:</strong> {new Date(b.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
