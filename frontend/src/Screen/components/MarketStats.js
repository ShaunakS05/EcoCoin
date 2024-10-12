import React from "react";
import "./MarketStats.css";
const MarketStats = () => {
  return (
    <div className="market-stats">
      <h3>Market Stats</h3>
      <div className="market-content">
        <p>Earned by Artists: 2.40 ETH (+5.2%)</p>
        <p>Secondary Sales: 3.40 ETH (+8.2%)</p>
        <p>Avg Release Value: 3.20 ETH (+3.1%)</p>
      </div>

    </div>
  );
};

export default MarketStats;
