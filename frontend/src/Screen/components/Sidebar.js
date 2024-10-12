import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Recent Activity</h2>
      <div className="activity-item">Le Anime liked your post "Mariland Wag"</div>
      <div className="activity-item">Karma Chameleon purchased 0.5 tons of CO₂</div>
      <div className="activity-item">You received 0.08 ETH for staking credits</div>
      <div className="activity-item">Sakvator.eth started following you</div>

      <h3>Market Stats</h3>
      <div className="market-stats">
        <p>Earned by Artists: 2.40 ETH (+5.2%)</p>
        <p>Secondary Sales: 3.40 ETH (+8.2%)</p>
        <p>Avg Release Value: 3.20 ETH (+3.1%)</p>
      </div>
    </div>
  );
};

export default Sidebar;
