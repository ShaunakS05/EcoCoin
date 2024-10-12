import React from "react";
import "./TopCreators.css";

const TopCreators = () => {
  return (
    <div className="top-creators">
      <h3>Top Traders</h3>
      <div className="creator-item">
        <img src="https://via.placeholder.com/50" alt="Profile" />
        <span>Nyan Prakash</span>
        <span>50 tons</span>
      </div>
      <div className="creator-item">
        <img src="https://via.placeholder.com/50" alt="Profile" />
        <span>Hadi Benkorah</span>
        <span>44 tons</span>
      </div>
      <div className="creator-item">
        <img src="https://via.placeholder.com/50" alt="Profile" />
        <span>Shaunak Sinha</span>
        <span>32 tons</span>
      </div>
      <div>
        <h3>Current Investments</h3>
        
      </div>
    </div>
  );
};

export default TopCreators;
