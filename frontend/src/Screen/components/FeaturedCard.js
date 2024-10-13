import "./FeaturedCard.css";
import React, { useEffect, useState } from "react";

const FeaturedCard = ({ onClose }) => {
    const [isOpen, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    };

    // useEffect(() =>{
    //     const fetchImageUrl = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8000/startImage")
    //         }
    //     }
    // })
    return (
        isOpen && (
            <div className="featured-card">
                <img src="https://via.placeholder.com/300" alt="Carbon Project" />
                <h3>*NEW* Boston Green Park Project</h3>
                <p>
                    This park is going to use zero-emissions and include a group of solar planes that provide free EV-charging for the community. 
                    <a href="https://wondershall.com">Learn More!</a>
                </p>
                <p>Highest Bid: 3.25 ETH</p>
                <p>Ending in: 6 hours 1 minute</p>
                <div className="card-buttons">
                    <button className="purchase-button">Purchase</button>
                    <button className="stake-button" onClick={handleClose}>Close</button>
                </div>
            </div>
        )
    );
};

export default FeaturedCard;
