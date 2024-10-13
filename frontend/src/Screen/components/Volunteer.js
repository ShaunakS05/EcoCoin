import React from 'react';
import './events.css'; // Assuming you have a CSS file for styling


const Volunteer = ({ eventName, Description, typeOfCoin, DateTime, Compension, Location, OnCloseOpInside }) => {
  // Calculate progress as a percentage, ensure no division by zero

  return (
    <div className="fundraiser-card">
      <div className="card-header">
        <h2 className="card-title">{eventName}</h2>
        <p className="card-description">{Description}</p>
      </div>
      
      <div>
        <br></br>
        <h3>Earn {Compension} {typeOfCoin} per hour and help the community!</h3>
        <br></br>
      </div>
    </div>
  );
};

export default Volunteer;
