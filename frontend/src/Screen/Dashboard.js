import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import FeaturedCard from "./components/FeaturedCard";
import TopCreators from "./components/TopBuyers";
import SearchIcon from '@mui/icons-material/Search';
import "./Dashboard.css";

function Dashboard() {
    const [isTrading, setTrading] = useState(false);
    const [tradeColor, setTradeColor] = useState(""); // To manage the background color
    const [isNotSearch, setNotSearch] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState("");
    const [isSearchAtTop, setSearchAtTop] = useState(false);

    // Handle the Buy action
    const handleBuy = () => {
        setTradeColor("green"); // Set background to green for Buy
        setTimeout(() => {
            setTrading(false); // Close the trade window after the fade
        }, 200); // Timeout duration should match the CSS transition time
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            setSearchAtTop(true);
        }
    };

    // Handle the Sell action
    const handleSell = () => {
        setTradeColor("red"); // Set background to red for Sell
        setTimeout(() => {
            setTrading(false); // Close the trade window after the fade
        }, 200); // Timeout duration should match the CSS transition time
    };

    const toggleTrade = () => {
        setTrading(!isTrading);
        setTradeColor(""); // Reset the color when opening the trade window
        setNotSearch(false);
    };

    const toggleSearch = () => {
        setNotSearch(!isNotSearch);
        if(!isNotSearch)
        {
            setSearchAtTop(false);
        }
        setTrading(false);
    };

    const applyBlurEffect = isNotSearch || isTrading ? 'blur(5px)' : 'none';
    const applyPointerEvents = isNotSearch || isTrading ? 'none' : 'auto';

    return (
        <div className="app">


{isNotSearch && (
                <div
                    className={`searchbar-container ${isSearchAtTop ? "searchbar-at-top" : ""}`}
                >
                    <input
                        type="text"
                        className="searchbar"
                        placeholder="Search..."
                        autoFocus
                        onKeyDown={handleEnterPress}
                        style={{ fontSize: "30px" }}
                    />
                </div>
            )}


            {isTrading && (
                <div className={`trade-container ${tradeColor && `fade-${tradeColor}`}`}>
                    <div className="close-button" onClick={() => setTrading(false)}>x</div>
                    <h1 style={{ textAlign: 'left', position: 'absolute', top: '0' }}>Trade</h1>
                    <br />
                    <br></br>
                    <br></br>
                    <div className="form-group">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            className="register-input"
                        >
                            <option value="" disabled>Select emission type</option>
                            <option value="Carbon">Carbon</option>
                            <option value="Methane">Methane</option>
                            <option value="Nitrous Oxide">Nitrous Oxide</option>
                        </select>
                    </div>
                    <br />
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <br />
                    <button className="buy-button" onClick={handleBuy}>Buy</button>
                    <button className="sell-button" onClick={handleSell}>Sell</button>

                    <button className="nothing-button">Current Price: $XXX</button>


                </div>
            )}
            <div style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>
            <Sidebar  />

            </div>
            <div className="main-content" style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>
                <FeaturedCard />
            </div>
            <div style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>
            <TopCreators  />

            </div>

            {/* Search Icon to trigger the spotlight search */}
            <div className="search-container" onClick={toggleSearch}>
                <SearchIcon className="searchbar" />
            </div>

            {/* Trade Button */}
            <div className="trade-button" style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }} onClick={toggleTrade}>
                <h3>Trade</h3>
            </div>
        </div>
    );
}

export default Dashboard;
