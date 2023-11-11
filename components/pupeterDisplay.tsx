"use client"


"use client"

import { useEffect, useState } from 'react';
import Hero from "@/components/hero";


const getFollowerCount = async () => {
  const res = await fetch(`https://scrap-puppeteer.vercel.app/api/scrap`);
  const data = await res.json();
  return data;
}

export default function Home() {
  const [followerCount, setFollowerCount] = useState(null);



  const fetchAndUpdateFollowerCount = async () => {
    const followerData = await getFollowerCount();
    const seller = followerData.followerCount;
    setFollowerCount(seller);
  };

  useEffect(() => {
    // Fetch initially
    fetchAndUpdateFollowerCount();

    // Fetch every 3 seconds
    const intervalId = setInterval(fetchAndUpdateFollowerCount, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means it only runs once on mount

  return (
    <main className="w-full h-screen text-white flex flex-col gap-4 justify-center items-center Bg">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold">{followerCount}</h1>
        <h1>Followers</h1>
      </div>
      <Hero />
    </main>
  );
}