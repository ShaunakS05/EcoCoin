import {React, useState} from "react";
import "./Sidebar.css";


const Sidebar = () => {
    const [CO, setCO2] = useState(0);
    const [Methane, setMethane] = useState(0);
    const [Oxide, setOxide] = useState(0);

  return (
    <div className="sidebar">
      <h2>Recent Activity</h2>
      <div className="activity-item">Le Anime liked your post "Mariland Wag"</div>
      <div className="activity-item">Karma Chameleon purchased 0.5 tons of CO₂</div>
      <div className="activity-item">You received 0.08 ETH for staking credits</div>
      <div className="activity-item">Sakvator.eth started following you</div>

      <h3>Market Stats</h3>
      
      <div className="creator-item">
        <span>CO₂</span>
        <span>{CO}</span>
       
        </div>

        <div className="creator-item">
        <span>CH₄</span>
        <span>{Methane}</span>
       
        </div>

        <div className="creator-item">
        <span>N₄O</span>
        <span>{Oxide}</span>
        </div>


        
        
    </div>
  );
};

export default Sidebar;
