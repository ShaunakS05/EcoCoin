import React from "react";
import Sidebar from "./components/Sidebar";
import FeaturedCard from "./components/FeaturedCard";
import TopCreators from "./components/TopBuyers";
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
    </div>
  );
}

export default Dashboard;
