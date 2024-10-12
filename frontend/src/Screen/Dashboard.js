import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import FeaturedCard from "./components/FeaturedCard";
import TopCreators from "./components/TopBuyers";
import SearchIcon from '@mui/icons-material/Search';
import { IgrFinancialChart, FinancialIndicatorType, FinancialOverlayType } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import { BottomClipper, TrendLineType } from 'igniteui-react-core';

import MenuIcon from '@mui/icons-material/Menu'; // Icon for collapsed state
import CloseIcon from '@mui/icons-material/Close'; // Icon for expanded state


import "./Dashboard.css";
import { styled } from "@mui/material";
IgrFinancialChartModule.register();

function Dashboard() {
    const [isOverlayCollapsed, setIsOverlayCollapsed] = useState(false);

    const [IsTrading, setTrading] = useState();

    const[isBlur, setBlur] = useState(true);
    const [tradeColor, setTradeColor] = useState("");
    const [isNotSearch, setNotSearch] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState("");
    const [date, setDate] = useState("1-Month");
    const [GraphData, setGraphData] = useState([]);
    const [isSearchAtTop, setSearchAtTop] = useState(false);
    const [selectedTrendLineType, setSelectedTrendLineType] = useState(TrendLineType.None);

    const trendLineOptions = [
        { name: "None", value: TrendLineType.None },
        { name: "Simple Moving Average", value: TrendLineType.SimpleAverage },
        { name: "Exponential Moving Average", value: TrendLineType.ExponentialAverage },
        // Add more trend line types as needed
    ];
    

    // New state variables for indicators and overlays
    const [selectedIndicators, setSelectedIndicators] = useState([]);
    const [selectedOverlays, setSelectedOverlays] = useState([]);

    // Handle the Buy action
    const handleBuy = () => {
        setTradeColor("green");
        setTimeout(() => {
            setTrading(false);
        }, 200);
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            setSearchAtTop(true);
        }
    };

    // Handle the Sell action
    const handleSell = () => {
        setTradeColor("red");
        setTimeout(() => {
            setTrading(false);
        }, 200);
    };

    const toggleTrade = () => {
        setTrading(!IsTrading);
        setTradeColor("");
        setNotSearch(false);
    };

    const toggleSearch = () => {
        setNotSearch(!isNotSearch);
        if (!isNotSearch) {
            setSearchAtTop(false);
        }
        setTrading(false);
    };

    useEffect(() => {
        const formData = new FormData();
        formData.append('date', date);
        fetch("http://localhost:8000/BCT-Price", { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                const processedData = data.prices.map(item => ({
                    Open: item.open,
                    High: item.open,
                    Low: item.open,
                    Close: item.open,
                    Date: new Date(item.date.replace(' ', 'T'))
                }));
                setGraphData(processedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [date]);

    const applyBlurEffect = isNotSearch || IsTrading || isBlur ? 'blur(5px)' : 'none';
    const applyPointerEvents = isNotSearch || IsTrading || isBlur ? 'none' : 'auto';

    // Define available indicators and overlays
    // Define available indicators using FinancialIndicatorType
const availableIndicators = [
    { name: "Moving Average", value: FinancialIndicatorType.MovingAverage },
    { name: "Relative Strength Index", value: FinancialIndicatorType.RelativeStrengthIndex },
    // Add more indicators as needed
];

// Define available overlays using FinancialOverlayType
const availableOverlays = [
    { name: "Bollinger Bands", value: FinancialOverlayType.BollingerBands },
    { name: "Price Channel", value: FinancialOverlayType.PriceChannel }
    // Add more overlays as needed
];


    // Handle indicator selection
    const handleIndicatorChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedIndicators(prevState =>
            prevState.includes(value)
                ? prevState.filter(indicator => indicator !== value)
                : [...prevState, value]
        );
    };

    const formatDateLabel = (item) => {
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(item);
    };
    
    const formatValueLabel = (value) => {
        return `$${value.toFixed(2)}`;
    };
    

    const handleFeatureCardClose = () => {
        setBlur(false);

    }

    // Handle overlay selection
    const handleOverlayChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedOverlays(prevState =>
            prevState.includes(value)
                ? prevState.filter(overlay => overlay !== value)
                : [...prevState, value]
        );
    };

    return (
        <div className="app">
            {isBlur && (
        <FeaturedCard
            
            onClose={() => setBlur(false)}
        />
    )}
    <div
  className="date-button-group"
  style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}
>
  <button
    className={date === "1-Day" ? "date-select-button" : "date-button"}
    onClick={() => setDate("1-Day")}
  >
    1D
  </button>
  <button
    className={date === "1-week" ? "date-select-button" : "date-button"}
    onClick={() => setDate("1-week")}
  >
    1W
  </button>
  <button
    className={date === "1-Month" ? "date-select-button" : "date-button"}
    onClick={() => setDate("1-Month")}
  >
    1M
  </button>
  <button
    className={date === "6-Month" ? "date-select-button" : "date-button"}
    onClick={() => setDate("6-Month")}
  >
    6M
  </button>
  <button
    className={date === "1-yr" ? "date-select-button" : "date-button"}
    onClick={() => setDate("1-yr")}
  >
    1Y
  </button>
</div>


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
            <div style={{filter: applyBlurEffect, pointerEvents: applyPointerEvents}}className={`overlay-panel ${isOverlayCollapsed ? 'collapsed' : ''}` }>
    <div className="overlay-header">
<h3>Selected Indictors</h3>       <button className="collapse-button" onClick={() => setIsOverlayCollapsed(!isOverlayCollapsed)}>
            {isOverlayCollapsed ? <MenuIcon /> : <CloseIcon />}
        </button>
    </div>
    {!isOverlayCollapsed && (
        <>
            {availableIndicators.map(indicator => (
                <div key={indicator.value}>
                    <input
                        type="checkbox"
                        value={indicator.value}
                        onChange={handleIndicatorChange}
                        checked={selectedIndicators.includes(indicator.value)}
                    />
                    <label>{indicator.name}</label>
                </div>
            ))}

            <h3>Select Overlays</h3>
            {availableOverlays.map(overlay => (
                <div key={overlay.value}>
                    <input
                        type="checkbox"
                        value={overlay.value}
                        onChange={handleOverlayChange}
                        checked={selectedOverlays.includes(overlay.value)}
                    />
                    <label>{overlay.name}</label>
                </div>
            ))}

            <h3>Select Trend Line</h3>
            <select
                value={selectedTrendLineType}
                onChange={(e) => setSelectedTrendLineType(parseInt(e.target.value))}
            >
                {trendLineOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                ))}
            </select>
        </>
    )}
</div>

{IsTrading && (
                <div className={`trade-container ${tradeColor && `fade-${tradeColor}`}`}>
                    <CloseIcon className="close-button" onClick={() => setTrading(false)}></CloseIcon>
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
                <Sidebar />
            </div>

            <div className="main-content" style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>

                {/* Overlay Panel for Indicators and Overlays */}
                {/* Overlay Panel for Indicators and Overlays */}



                <div className="stock-chart">
                    

                    <br />
                    <IgrFinancialChart
    width="100%"
    height="600px"
    chartType="Line"                   // Standard line chart
    xAxisMode="Time"
    yAxisMode="Numeric"
    z-index={100}
    volumeType="None"                  // Hide volume bars
    dataSource={GraphData}
    indicatorTypes={selectedIndicators}
    overlayTypes={selectedOverlays}
    trendLineType={selectedTrendLineType}
    trendLineThickness={2}
    trendLinePeriod={10}
    brushes={["#56e39f"]}              // Line color
    thickness={2}                      // Line thickness
    chartTitle="Emission Allowances"                      // Remove title
    subtitle="Trading Price of CO2"                        // Remove subtitle
    xAxisTitle="Time"                      // Remove x-axis title
    yAxisTitle="Price USD"                      // Remove y-axis title
    isToolbarVisible={false}           // Hide toolbar
    isHorizontalZoomEnabled={false}    // Disable horizontal zoom
    isVerticalZoomEnabled={false}      // Disable vertical zoom
    background="transparent"           // Transparent background
    plotAreaBackground="#2e2e2e"       // Plot area background color
    xAxisMajorStroke="transparent"     // Hide x-axis major gridlines
    yAxisMajorStroke="transparent"     // Hide y-axis major gridlines
    xAxisMinorStroke="transparent"     // Hide x-axis minor gridlines
    yAxisMinorStroke="transparent"     // Hide y-axis minor gridlines
    xAxisLabelTextStyle="12px Arial, sans-serif"
    yAxisLabelTextStyle="12px Arial, sans-serif"
    xAxisLabelTextColor="#ffffff"
    yAxisLabelTextColor="#ffffff"
    xAxisFormatLabel={formatDateLabel}
    yAxisFormatLabel={formatValueLabel}
    crosshairsDisplayMode="None"       // Disable crosshairs
    // ... any additional properties ...
/>

                    
    


                </div>
            </div>

            <div style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>
                <TopCreators />
                <input value={date} onChange={(e) => setDate(e.target.value)}></input>
            </div>

            {/* Search Icon to trigger the spotlight search */}
            <div className="search-container" onClick={toggleSearch}>
                {isNotSearch ? <CloseIcon className="searchbar" /> : <SearchIcon className="searchbar" />}
            </div>

            {/* Trade Button */}
            <div className="trade-button" style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }} onClick={toggleTrade}>
                <h3>Trade</h3>
            </div>
        </div>
    );
}

export default Dashboard;
