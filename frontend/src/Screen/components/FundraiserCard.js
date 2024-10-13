import {React, useState} from 'react';
import './events.css'; // Assuming you have a CSS file for styling
import ProgressBar from 'react-bootstrap/ProgressBar'; // Correct import path


const FundraiserCard = ({ eventName, description, currentCoins, targetCoins, typeOfCoins, endDate, OnCloseOpInside, userName }) => {
  // Calculate progress as a percentage, ensure no division by zero
  const progress = targetCoins > 0 ? (currentCoins / targetCoins) * 100 : 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [invested, setInvested] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(true);
  };

  const handleStake = () => {
    const form = new FormData();
    form.append('amount', quantity);
    form.append('EventName', eventName);
    form.append('token_name', typeOfCoins);
    form.append('userName', userName);

    fetch("http://localhost:8000/invest-in-stake", { 
      method: 'POST',
      body: form 
    })
    .then(response => response.json())
    .then(data => {
      console.log("Stake response:", data);
      setInvested(true); // Set invested to true upon success
    })
    .catch(error => {
      console.error('Error during staking:', error);
    });
  };
  

  // Round the progress to the nearest whole number
  const roundedProgress = Math.round(progress);

  return (
    <div
      className={'fundraiser-card'}
      onClick={toggleExpand} // Toggle expand on click
      style={{ cursor: 'pointer', height: isExpanded ? "auto" : "50px"}} // Change cursor to pointer
    >
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

      {isExpanded && (
        <div style={{ color: 'white' }}>
          <br />
          
          <input 
            className='register-input' 
            placeholder='Enter your Donation Amount'
            style={{textAlign: 'center', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} // Update quantity state on change
          />
          <br></br>
          <br></br>

          <div 
            className={invested ? "trade-no-color-button" : "trade-color-button"} 
            onClick={!invested ? handleStake : null} // If invested, onClick does nothing
          >
            {invested ? <h3>Donated!</h3> : <h3>Donate</h3>}
          </div>
        </div>
      )}
















    </div>
  );
};

export default FundraiserCard;
