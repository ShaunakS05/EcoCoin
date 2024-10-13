import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import NewsComponent from "./NewsComponent";

const Sidebar = () => {
  const [newsItems, setNewsItems] = useState([]);

  const fetchNews = () => {
    fetch('http://localhost:8000/return-news-articles') // Replace with your actual endpoint
      .then(response => response.json())
      .then(data => {
        // Assume data is an array of news items
        setNewsItems(data.slice(0, 3)); // Get first 4 news items
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  };
/*
  useEffect(() => {
    fetchNews(); // Initial fetch

    const interval = setInterval(() => {
      fetchNews(); // Refresh every 15 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
*/
  return (
    <div className="sidebar">
      <h2>Environmental News</h2>
      {newsItems.map((item, index) => (
        <NewsComponent
          key={index}
          title={item.title}
          link={item.link}
          snippet={item.snippet}
        />
      ))}
    </div>
  );
};

export default Sidebar;
