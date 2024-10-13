import {React, useState} from 'react';
import './events.css'; // Assuming you have a CSS file for styling


const Volunteer = ({ eventName, Description, typeOfCoin, DateTime, Compension, Location, OnCloseOpInside, userName }) => {
  // Calculate progress as a percentage, ensure no division by zero

  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(0);
    const [invested, setInvested] = useState(false);


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

      {isExpanded && (
        <div style={{ color: 'white' }}>
          
          <input 
            className='register-input' 
            placeholder='Enter the number of hours you would like to volunteer'
            style={{textAlign: 'center', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}
            value={quantity} 
          />
       

          <div 
            className={invested ? "trade-no-color-button" : "trade-color-button"} 
          >
            {invested ? <h3>RSVP</h3> : <h3>RSVP</h3>}
          </div>
        </div>
      )}




    </div>
  );
};

export default Volunteer;
