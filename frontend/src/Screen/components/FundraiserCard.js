import React from 'react';
import './events.css'; // Assuming you have a CSS file for styling

const FundraiserCard = ({ eventName, description, currentCoins, targetCoins, typeOfCoins, endDate }) => {
  const progressPercentage = (currentCoins / targetCoins) * 100;

  return (
    <div className="fundraiser-card">
      <div className="card-header">
        <h2 className="card-title">{eventName}</h2>
        <p className="card-description">{description}</p>
      </div>
      
      
      
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <div className="goal-info">
        <span>Goal: {currentCoins} / {targetCoins} {typeOfCoins}</span>
      </div>
    </div>
  );
};

export default FundraiserCard;
