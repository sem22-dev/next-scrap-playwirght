"use client"

// pages/index.js
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [followerCount, setFollowerCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/scrap');
        const data = await response.json();
        setFollowerCount(data.followerCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Twitter Follower Count</h1>
      {followerCount !== null ? (
        <p>{`Follower Count: ${followerCount}`}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
