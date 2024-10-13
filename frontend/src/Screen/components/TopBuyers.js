import React, { useEffect, useState } from "react";
import "./TopCreators.css";

const TopCreators = ({ userNameProp }) => {
  const [co2, setco2] = useState(0);
  const [mo2, setmo2] = useState(0);
  const [ch4, setch4] = useState(0);

  useEffect(() => {
    const fetchBalance = () => {
      const formData = new FormData();
      formData.append('userName', userNameProp);
      
      fetch("http://localhost:8000/balance", { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
          setco2(data.MCO2);
          setmo2(data.BCT);
          setch4(data.NCT);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    // Fetch balance initially
    fetchBalance();

    // Set up interval to fetch balance every 5 seconds
    const intervalId = setInterval(fetchBalance, 5000); // 5000 milliseconds = 5 seconds

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [userNameProp]);

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
        <h4>Carbon Dioxide: {co2} CEC </h4>
         <h4> Methane: {ch4} MEC; </h4>
        <h4>Nitrous Oxide: {mo2} NOEC </h4>
      </div>
    </div>
  );
};

export default TopCreators;
