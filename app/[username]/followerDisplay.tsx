"use client"

import React, { useRef, useState, useEffect } from "react";
import useOdometer from "./useOdometer"; // Import the useOdometer hook
import Image from "next/image";
import Link from "next/link";
import Chart from "react-apexcharts";   

export default function DisplayFollowers({ username }: { username: string }) {
  const [followerCount, setFollowerCount] = useState<number | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const intervalRef = useRef<number | null | undefined>(null);
  const targetRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://scrap.semjjonline.xyz/user-details?username=${username}`);
      const data = await response.json();
      setFollowerCount(data.followerCount);
      setProfilePicUrl(data.profilePicUrl);
    } catch (error) {
      console.error('Error fetching follower count:', error);
      setFollowerCount(null);
    }
  };

  // Use the useOdometer hook to handle the animation
  useOdometer(targetRef, followerCount || 0);

  useEffect(() => {
    // Start a new interval if the username is provided
    if (username) {
      intervalRef.current = setInterval(fetchData, 4000) as any;
    }

    // Cleanup interval when the component unmounts or when the user leaves the page
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [username, fetchData]);

  return (
    <main className="flex flex-col items-center backgroundC justify-center h-screen">
        {!profilePicUrl &&
          <div className="absolute bg-black body bg-opacity-70 main h-screen w-screen flex flex-col gap-4 justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="128px" width="256px" viewBox="0 0 256 128" className="ip">
            <defs>
              <linearGradient y2="0" x2="1" y1="0" x1="0" id="grad1">
                <stop stop-color="#5ebd3e" offset="0%"></stop>
                <stop stop-color="#ffb900" offset="33%"></stop>
                <stop stop-color="#f78200" offset="67%"></stop>
                <stop stop-color="#e23838" offset="100%"></stop>
              </linearGradient>
              <linearGradient y2="0" x2="0" y1="0" x1="1" id="grad2">
                <stop stop-color="#e23838" offset="0%"></stop>
                <stop stop-color="#973999" offset="33%"></stop>
                <stop stop-color="#009cdf" offset="67%"></stop>
                <stop stop-color="#5ebd3e" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g stroke-width="16" stroke-linecap="round" fill="none">
              <g stroke="#ddd" className="ip__track">
                <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"></path>
                <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"></path>
              </g>
              <g stroke-dasharray="180 656">
                <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" stroke-dashoffset="0" stroke="url(#grad1)" className="ip__worm1"></path>
                <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" stroke-dashoffset="358" stroke="url(#grad2)" className="ip__worm2"></path>
              </g>
            </g>
          </svg>
          <h1 className="text-white text-xl">Fetching followers...</h1>
        </div>
        }
      <div className="text-center mb-12">
      <div className="flex flex-col items-center">
        {profilePicUrl ? (
            <Image
            width={400}
            height={400}
            className="w-40 h-40 rounded-full mx-auto mb-4"
            src={profilePicUrl}
            alt="Profile"
            />
        ) : (
            <Image
            width={400}
            height={400}
            className="w-40 h-40 rounded-full mx-auto mb-4"
            src={'/default.webp'}
            alt="Profile"
            
            />
        )}
        <Link target="_blank" href={`https://twitter.com/${username}`} className="mb-2 flex items-center gap-2">
          <p className="text-gray-700">@{username}</p>
          <TwitterSvg />
        </Link>



      </div>

        <div className="text-lg">
          <p className=" text-8xl font-semibold" ref={targetRef} />
          <p className="text-sm">Followers</p>
        </div>
      </div>
      <ChartContainer followerCount={followerCount} />
    </main>
  );
}


function TwitterSvg(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" height="30" width="30">
<path fill="#212121" fill-rule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clip-rule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
</svg>
    )
}

interface ChartData {
    options: {
      // Your options type
    };
    series: {
      name: string;
      data: number[]; // Change this to the actual type of your data
    }[];
  }

function ChartContainer({ followerCount }: { followerCount: number | null }) {
   
    const [chartData, setChartData] = useState<ChartData>({
        options: {
          colors: ["#FFFF00"],
          chart: {
            id: "basic-line",
            animations: {
              enabled: true,
            },
            toolbar: {
              show: false,
            },
          },
          tooltip: {
            enabled: false,
            style: {
              fontSize: '20px',
              fontFamily: 'Roboto',
            },
            x: {
              show: true,
              format: 'HH:mm',
            },
            marker: {
              show: true,
            },
            theme: 'dark',
          },
          xaxis: {
            type: "numeric",
            labels: {
              style: {
                colors: "#808080",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#808080",
              },
              formatter: (value: number) => Math.round(value), // Round to the nearest whole number
            },
            forceNiceScale: true, // Ensure the y-axis scale is rounded to nice values
          },
          dataLabels: {
            enabled: false,
          },
        },
        series: [
          {
            name: "Followers",
            data: [],
          },
        ],
      });
  
    useEffect(() => {
      if (followerCount !== null) {
        setChartData((prevChartData) => {
          const newData = [...prevChartData.series[0].data, followerCount];
          return {
            ...prevChartData,
            series: [{ name: "Followers", data: newData }],
          };
        });
      }
    }, [followerCount]);
  
    return (
      <div className="chart-container max-w-screen z-0">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
        />
      </div>
    );
  }
  