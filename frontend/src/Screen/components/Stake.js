import React, { useState } from 'react';
import './events.css'; // Assuming you have a CSS file for styling

const Stake = ({ eventName, Description, TypeOfCoin, StartDate, EndDate, ReturnOnInvestment, LengthOfTime, userName }) => {
  // State to toggle the height of the card
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [invested, setInvested] = useState(false);

  // Function to toggle the expanded state
  const toggleExpand = () => {
    setIsExpanded(true);
  };

  // Function to handle the stake request
  const handleStake = () => {
    const form = new FormData();
    form.append('amount', quantity);
    form.append('EventName', eventName);
    form.append('token_name', TypeOfCoin);
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








  return (
    <div
      className={'fundraiser-card'}
      onClick={toggleExpand} // Toggle expand on click
      style={{ cursor: 'pointer', height: isExpanded ? "auto" : "50px"}} // Change cursor to pointer
    >
      <div className="card-header">
        <h2 className="card-title">{eventName}</h2>
        <p className="card-description">{Description}</p>
      </div>

      {isExpanded && (
        <div style={{ color: 'white' }}>
          <br />
          <p className='card-description'>
           <p> Statement: Invest up to 10,000 {TypeOfCoin} and receive a {ReturnOnInvestment}% return after {LengthOfTime} years</p>
          </p>
          <br />
          <input 
            className='register-input' 
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
            {invested ? <h3>Invested</h3> : <h3>Stake</h3>}
          </div>
        </div>
      )}

      <div className="goal-info"></div>
    </div>
  );
};

export default Stake;
