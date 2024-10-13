import React from 'react';
import './events.css'; // Assuming you have a CSS file for styling
import ProgressBar from 'react-bootstrap/ProgressBar'; // Correct import path


const FundraiserCard = ({ eventName, description, currentCoins, targetCoins, typeOfCoins, endDate, OnCloseOpInside }) => {
  // Calculate progress as a percentage, ensure no division by zero
  const progress = targetCoins > 0 ? (currentCoins / targetCoins) * 100 : 0;

  

  // Round the progress to the nearest whole number
  const roundedProgress = Math.round(progress);

  return (
    <div className="fundraiser-card">
      <div className="card-header">
        <h2 className="card-title">{eventName}</h2>
        <p className="card-description">{description}</p>
      </div>
      
      <div>
        <br></br>
        <ProgressBar now={roundedProgress} label={`   ${roundedProgress}%`} /> {/* Label shows rounded progress */}
        <br></br>
      </div>

      <div className="goal-info">
        <span>Goal: {currentCoins} / {targetCoins} {typeOfCoins}</span>
      </div>
    </div>
  );
};

export default FundraiserCard;
