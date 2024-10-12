import "./FeaturedCard.css";
import React, { useState } from "react";

const FeaturedCard = () => {
    const [isOpen, setOpen] = useState(true);

    return (
        isOpen && (
            <div className="featured-card">
                <img src="https://via.placeholder.com/300" alt="Carbon Project" />
                <h3>Wondershall</h3>
                <p>
                    There will have text about the art. It will tell about its description.
                    <a href="https://wondershall.com">https://wondershall.com</a>
                </p>
                <p>Highest Bid: 3.25 ETH</p>
                <p>Ending in: 6 hours 1 minute</p>
                <div className="card-buttons">
                    <button className="purchase-button">Purchase</button>
                    <button className="stake-button" onClick={() => setOpen(false)}>Close</button>
                </div>
            </div>
        )
    );
};

export default FeaturedCard;
