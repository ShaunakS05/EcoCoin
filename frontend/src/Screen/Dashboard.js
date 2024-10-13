import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import FeaturedCard from "./components/FeaturedCard";
import { useLocation } from "react-router";
import TopCreators from "./components/TopBuyers";
import SearchIcon from '@mui/icons-material/Search';
import { IgrFinancialChart, FinancialIndicatorType, FinancialOverlayType } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import { BottomClipper, TrendLineType, typeCast } from 'igniteui-react-core';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stake from "./components/Stake";
import Volunteer from "./components/Volunteer";


import FundraiserCard from "./components/FundraiserCard";

import MenuIcon from '@mui/icons-material/Menu'; // Icon for collapsed state
import CloseIcon from '@mui/icons-material/Close'; // Icon for expanded state
import "./Dashboard.css";



// Registering the chart module
IgrFinancialChartModule.register();

function Dashboard() {
    const location = useLocation();
    const userName = location.state?.userName; // Retrieve userName from state


    const [LookatOP, setLookatOP] = useState(false);
    const [closeOP, setcloseOP] = useState(false);

    const [LookingSearchResults, setLookingSearchResults] = useState(false);

    const [isOverlayCollapsed, setIsOverlayCollapsed] = useState(false);
    const [IsTrading, setTrading] = useState(false);
    const [isBlur, setBlur] = useState(true);
    const [tradeColor, setTradeColor] = useState("");
    const [isNotSearch, setNotSearch] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState("");
    const [date, setDate] = useState("1-Month");
    const [GraphData, setGraphData] = useState([]);
    const [isSearchAtTop, setSearchAtTop] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [result, setResult] = useState([]);
    const [selectedTrendLineType, setSelectedTrendLineType] = useState(TrendLineType.None);
    const [transaction, setTransactionDone] = useState(false);
    const [message, setMessage] = useState("");
    const [hashblock, setHashblock] = useState("");
    const [tranactionHash, setTransactionHash] = useState("");

    const [searched, setSearched] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const [searchStake, setStakeResults] = new useState([]);
    const {searchVol, setVolResults} = new useState([]);


    const [endpoint, setEndpoint] = useState("http://localhost:8000/BCT-Price");

    const BCT = "http://localhost:8000/BCT-Price";
    const MCO2 = "http://localhost:8000/MCO2-Price";
    const NCT = "http://localhost:8000/NCT-Price";
    const trendLineOptions = [
        { name: "None", value: TrendLineType.None },
        { name: "Simple Moving Average", value: TrendLineType.SimpleAverage },
        { name: "Exponential Moving Average", value: TrendLineType.ExponentialAverage },
        // Add more trend line types as needed
    ];

    // New state variables for indicators and overlays
    const [selectedIndicators, setSelectedIndicators] = useState([]);
    const [selectedOverlays, setSelectedOverlays] = useState([]);

    // Handle Enter press in search input
    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            setIsOverlayCollapsed(true);
            setSearchAtTop(true);
            const formData = new FormData();
            formData.append('EventName', "Fundraising Events"); // Send search term in the form data
            
            fetch("http://localhost:8000/return-all-events", { 
                method: 'POST', 
                body: formData 
            })
            .then(response => response.json())
            .then(data => {
                console.log("Search results:", data);
                // Transform the object into an array
                const events = Object.entries(data).map(([eventName, eventData]) => ({
                    eventName,
                    ...eventData
                }));
                setSearchResults(events);
                setSearched(true);
            })
            
            .catch(error => {
                console.error('Error fetching data:', error);
            });


            const formDataVol = new FormData();
            formDataVol.append('EventName', "Volunteering Events"); // Send search term in the form data
            
            fetch("http://localhost:8000/return-all-events", { 
                method: 'POST', 
                body: formDataVol 
            })
            .then(response => response.json())
            .then(data => {
                console.log("Search results:", data);
                // Transform the object into an array
                const events = Object.entries(data).map(([eventName, eventData]) => ({
                    eventName,
                    ...eventData
                }));
                setVolResults(events);
                setSearched(true);
            })
            
            .catch(error => {
                console.error('Error fetching data:', error);
            });


            const handleOPOpen = () => {
                setLookingSearchResults(false);
            }

            const handleOPClose = () => {
                setLookingSearchResults(false);
            }

            const formDataStake = new FormData();
            formDataStake.append('EventName', "Stakes"); // Send search term in the form data
            
            fetch("http://localhost:8000/return-all-events", { 
                method: 'POST',
                body: formDataStake 
            })
            .then(response => response.json())
            .then(data => {
                console.log("Search results:", data);
                // Transform the object into an array
                const events = Object.entries(data).map(([eventName, eventData]) => ({
                    eventName,
                    ...eventData
                }));
                setStakeResults(events);
                setSearched(true);
            })
            
            .catch(error => {
                console.error('Error fetching data:', error);
            });




        }
    };
    
    // Handle the Buy action
    const handleBuy = () => {
        setTradeColor("green");
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('token_name', type);
        formData.append('amount', quantity);
    
        fetch("http://localhost:8000/buy-carbon-credit", { 
            method: 'POST', 
            body: formData 
        })
        .then(response => response.json())
        .then(data => {
            setHashblock(data.block_hash);
            setTransactionHash(data.transaction_hash);
            setMessage(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('Error occurred while buying credits');
        })
        .then(() => setTransactionDone(true));
    };

    // Handle the Sell action
    const handleSell = () => {
        setTradeColor("red");
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('token_name', type);
        formData.append('amount', quantity);
    
        fetch("http://localhost:8000/sell-carbon-credit", { 
            method: 'POST', 
            body: formData 
        })
        .then(response => response.json())
        .then(data => {
            setHashblock(data.block_hash);
            setTransactionHash(data.transaction_hash);
            setMessage(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('Error occurred while buying credits');
        })
        .then(() => setTransactionDone(true));
    };

    const toggleTrade = () => {
        setTrading(!IsTrading);
        setTradeColor("");
        setNotSearch(false);
    };

    const setTradingToFalse = () => {
        setTrading(false);
        setTransactionDone(false);
    }
    const toggleSearch = () => {
        setNotSearch(!isNotSearch);
        if (!isNotSearch) {
            setSearchAtTop(false);
            setSearched(false);
        }
        setSearched(false);
        setTrading(false);
    };

    useEffect(() => {
        const formData = new FormData();
        formData.append('date', date);

        if(type === "Carbon") {
            setEndpoint(BCT);
        }
        else if(type === "Methane") {
            setEndpoint(MCO2);
        }
        else
        {
            setEndpoint(NCT);
        }
        fetch(endpoint, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                const processedData = data.prices.map(item => ({
                    Open: item.open,
                    High: item.high,
                    Low: item.low,
                    Close: item.close,
                    Date: new Date(item.date.replace(' ', 'T'))
                }));
                setGraphData(processedData);
                console.log("Data:", GraphData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [date, type]);

    const applyBlurEffect = isNotSearch || IsTrading || isBlur ? 'blur(5px)' : 'none';
    const applyPointerEvents = isNotSearch || IsTrading || isBlur ? 'none' : 'auto';

    const availableIndicators = [
        { name: "Moving Average", value: FinancialIndicatorType.MovingAverage },
        { name: "Relative Strength Index", value: FinancialIndicatorType.RelativeStrengthIndex },
    ];

    const availableOverlays = [
        { name: "Bollinger Bands", value: FinancialOverlayType.BollingerBands },
        { name: "Price Channel", value: FinancialOverlayType.PriceChannel },
    ];

    const handleIndicatorChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedIndicators(prevState =>
            prevState.includes(value)
                ? prevState.filter(indicator => indicator !== value)
                : [...prevState, value]
        );
    };
    

    const handleOverlayChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedOverlays(prevState =>
            prevState.includes(value)
                ? prevState.filter(overlay => overlay !== value)
                : [...prevState, value]
        );
    };

    const formatDateLabel = (item) => {
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(item);
    };
    
    const formatValueLabel = (value) => {
        return `$${value.toFixed(2)}`;
    };

    return (
        <div className="app">
            {isBlur && (
                <FeaturedCard onClose={() => setBlur(false)} />
            )}
            <div className="date-button-group" style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>
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
                {isOverlayCollapsed && <div  style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents, position:'absolute', left:'380px', top: '180px', zIndex:'30'}}>
            <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                    className="register-input"
                                >
                                    <option value="" >Select emission type</option>
                                    <option value="Carbon">Carbon</option>
                                    <option value="Methane">Methane</option>
                                    <option value="Nitrous Oxide">Nitrous Oxide</option>
                                </select>
                </div>
}


            {isNotSearch && (
                <div className={`searchbar-container ${isSearchAtTop ? "searchbar-at-top" : ""}`}>
                    <input
                        type="text"
                        className="searchbar"
                        placeholder="Search..."
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleEnterPress}
                        style={{ fontSize: "30px" }}
                    />
                </div>
            )}
{searched && !LookingSearchResults && (
  <div className="event-list">
    {/* Check if all arrays have no results */}
    {searchResults?.length === 0 && searchStake?.length === 0 && searchVol?.length === 0 ? (
      <p>No events found...</p>
    ) : (
      <>
        {/* Combine all events into one array and handle undefined values */}
        {[
          ...(searchResults || []).map((event, index) => ({ ...event, type: 'fundraiser', index })),
          ...(searchStake || []).map((event, index) => ({ ...event, type: 'stake', index })),
          ...(searchVol || []).map((event, index) => ({ ...event, type: 'volunteer', index }))
        ]
          // Shuffle the combined array
          .sort(() => Math.random() - 0.5)
          // Map through the shuffled events and render the corresponding components
          .map((event) => {
            if (event.type === 'fundraiser') {
              return (
                <FundraiserCard
                
                  key={`fundraiser-${event.index}`}
                  eventName={event.eventName}
                  description={event.Description}
                  userName={userName}
                  currentCoins={event.CurrentCoins}
                  targetCoins={event.TargetCoins}
                  progress={event.PercentageChange}
                  endDate={event.EndDate}

                />
              );
            } else if (event.type === 'stake') {
              return (
                <Stake
                  key={`stake-${event.index}`}
                  userName={userName}
                  eventName={event.eventName}
                  Description={event.Description}
                  ReturnOnInvestment={event.ReturnOnInvestment}
                  EndDate={event.EndDate}
                  StartDate={event.StartDate}
                  LengthOfTime={event.LengthOfTime}
                  TypeOfCoin={event.TypeOfCoin}
                />
              );
            } else if (event.type === 'volunteer') {
              return (
                <Volunteer
                  key={`volunteer-${event.index}`}
                  eventName={event.eventName}
                  Description={event.Description}
                  Location={event.CurrentCoins}
                  DateTime={event.DateTime}
                  TypeOfCoin={event.typeOfCoin}
                />
              );
            }
            return null;
          })}
      </>
    )}
  </div>
)}




            <div style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }} className={`overlay-panel ${isOverlayCollapsed ? 'collapsed' : ''}`}>
                <div className="overlay-header">
                    <h3>Selected Indicators</h3>
                    <button className="collapse-button" onClick={() => setIsOverlayCollapsed(!isOverlayCollapsed)}>
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
                <div style={{ width: transaction ? '700px' : '400px' }} className={`trade-container ${tradeColor && `fade-${tradeColor}`}`}>
                    <CloseIcon className="close-button" onClick={setTradingToFalse} />
                    <h1 style={{ textAlign: 'left', position: 'absolute', top: '0' }}>Trade</h1>
                    <br />
                    <br></br>
                    <br></br>
                    {!transaction ? (
                        <>
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
                        </>
                    ) : (
                        <div>
                            <p>{message}</p>
                            <p>Block Hash: {hashblock}</p>
                            <p>Transaction Hash: {tranactionHash}</p>
                        </div>
                    )}
                </div>
            )}

            <div style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>
                <Sidebar />
            </div>

            <div className="main-content" style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>
                <div className="stock-chart">
                    <IgrFinancialChart
                        width="100%"
                        height="600px"
                        chartType="Line"
                        xAxisMode="Time"
                        yAxisMode="Numeric"
                        dataSource={GraphData}
                        zIndex={1}
                        indicatorTypes={selectedIndicators}
                        overlayTypes={selectedOverlays}
                        trendLineType={selectedTrendLineType}
                        trendLineThickness={2}
                        trendLinePeriod={10}
                        brushes={["#56e39f"]}
                        thickness={2}
                        chartTitle="Emission Allowances"
                        subtitle="Trading Price of Emission Allowances"
                        xAxisTitle="Time"
                        yAxisTitle="Price USD"
                        isToolbarVisible={false}
                        isHorizontalZoomEnabled={false}
                        isVerticalZoomEnabled={false}
                        background="transparent"
                        plotAreaBackground="#2e2e2e"
                        xAxisMajorStroke="transparent"
                        yAxisMajorStroke="transparent"
                        xAxisMinorStroke="transparent"
                        yAxisMinorStroke="transparent"
                        xAxisLabelTextStyle="12px Arial, sans-serif"
                        yAxisLabelTextStyle="12px Arial, sans-serif"
                        xAxisLabelTextColor="#ffffff"
                        yAxisLabelTextColor="#ffffff"
                        xAxisFormatLabel={formatDateLabel}
                        yAxisFormatLabel={formatValueLabel}
                        crosshairsDisplayMode="None"
                    />
                </div>
            </div>

            <div style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }}>
                <TopCreators userNameProp={userName}/>
                <input value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="search-container" onClick={toggleSearch}>
                {isNotSearch ? <CloseIcon className="searchbar" /> : <SearchIcon className="searchbar" />}
            </div>

            <div className="trade-button" style={{ filter: applyBlurEffect, pointerEvents: applyPointerEvents }} onClick={toggleTrade}>
                <h3>Trade</h3>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default Dashboard;
