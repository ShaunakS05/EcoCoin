import React from "react";
import Sidebar from "./components/Sidebar";
import FeaturedCard from "./components/FeaturedCard";
import TopCreators from "./components/TopBuyers";
import SearchIcon from '@mui/icons-material/Search';
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <FeaturedCard />
        {/* Additional content such as market feeds can go here */}
      </div>
      <TopCreators />
      <SearchIcon style={{ fontSize: 40, color: 'green' }} /> {/* Icon with custom styling */}

      
    </div>
  );
}

export default Dashboard;
