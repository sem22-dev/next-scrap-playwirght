"use client"

import { useRouter } from 'next/navigation';

import {useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FollowerCount = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateToUsername();
  };

  const navigateToUsername = () => {
    // Use the Next.js router to navigate to the specified username
    if (username.trim() !== '') {
      router.push(`/${username}`);
    }
  };
  return (
    <div className="flex flex-col py-32 px-12 md:px-32 xl:px-[500px] bg-white backgroundC min-w-screen min-h-screen rounded-md">
      <div className=' flex flex-col items-center gap-12 mb-12'>
      <Image src={'/xTwitter.svg'} width={100} height={100} alt="twitter" /> 
        <h1 className='text-2xl font-medium'>Twitter Live Follower Counter</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="flex">
            <input
              type="text"
              value={username}
              placeholder="Enter twitter username"
              onChange={handleUsernameChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
            />
            {/* Use the existing Link component for the search icon */}
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </form>
      <div className="flex justify-center  mt-12">
        <Link target="_blank" rel="noopener noreferrer" href="https://twitter.com/Thotsem22" className="  inline-flex items-center justify-center gap-3 bg-white text-sm font-medium text-gray-500 transition-all duration-150 rounded-xl border border-gray-200 px-3 py-2 hover:bg-white hover:text-black hover:border-black mt-56 ">
          <Image src={'/xTwitter.svg'} width={500} height={500} alt="twitter" className="w-4 h-4" />
          <span className="text-sm font-medium ">@Sem</span>
        </Link>
      </div>
    </div>
  );
};

export default FollowerCount;


function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
