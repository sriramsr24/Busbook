

import React, { useState } from 'react';
import axios from 'axios';

function BusRoot() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    { from: 'Dindigul', to: 'College', distance: '35 km', fare: '₹40' },
    { from: 'Vathalakundu', to: 'College', distance: '28 km', fare: '₹35' },
    { from: 'Palani', to: 'College', distance: '45 km', fare: '₹50' },
    { from: 'Vedasanthoor', to: 'College', distance: '22 km', fare: '₹25' },
    { from: 'Vadamadurai', to: 'College', distance: '30 km', fare: '₹38' },
    { from: 'Seelapadi', to: 'College', distance: '25 km', fare: '₹30' },
    { from: 'Natham', to: 'College', distance: '40 km', fare: '₹45' },
    { from: 'Odapatty', to: 'College', distance: '33 km', fare: '₹42' },
    { from: 'Otanchathiram', to: 'College', distance: '50 km', fare: '₹55' },
  ];

  const handleViewDetails = (route) => {
    setSelectedRoute(route);
  };

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      alert("Please login to book a ticket.");
      return;
    }

    const booking = {
      userId: user.id,
      routeFrom: selectedRoute.from,
      routeTo: selectedRoute.to,
      distance: selectedRoute.distance,
      fare: selectedRoute.fare,
      timestamp: new Date().toISOString()
    };

    try {
      await axios.post("http://localhost:3000/bookings", booking);
      alert("Booking Successful!");
      setSelectedRoute(null);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className='busrootdiv-img'>
    <div className="container py-5 ">
      <h2 className="text-center mb-4">Bus Routes</h2>
      <div className="row   justify-content-center busrootdiv gap-4">
        {routes.map((route, index) => (
          <div key={index} className=" col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-center shadow card p-3  ">  
            <h5 className="mb-3">{route.from} to {route.to}</h5>
            <button className="btn btn-outline-primary" onClick={() => handleViewDetails(route)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for details */}
      {selectedRoute && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedRoute.from} to {selectedRoute.to}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedRoute(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Distance:</strong> {selectedRoute.distance}</p>
                <p><strong>Fare:</strong> {selectedRoute.fare}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedRoute(null)}>Close</button>
                <button className="btn btn-success" onClick={handleBooking}>Book</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}




export default BusRoot;

// //col-md-3 col-sm-6 card p-3 text-center shadow