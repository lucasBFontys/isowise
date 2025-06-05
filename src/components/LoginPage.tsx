'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

// Define font
const pressStart2P = Poppins({
  subsets: ['latin'],
  weight: ['400']
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    router.push('/dashboard'); // Redirect to dashboard on login
  };

  return (
    <div className="min-h-screen bg-[#220028] flex items-center justify-center relative overflow-hidden">
      {/* Curl achtergrond */}
      <Image src="/images/curl.png" alt="curl" fill priority className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-[4rem]">
            <span className="font-['Press_Start_2P'] text-white">ISO</span>
            <span className="font-['Poppins'] text-white font-light">wise</span>
          </h1>
        </div>

        {/* Login form */}
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="space-y-2">
            <label className="block text-sm text-white font-['Poppins']">gebruikersnaam</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#d1cccc] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
              placeholder="Voer uw gebruikersnaam in"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-white font-['Poppins']">wachtwoord</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#d1cccc] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
              placeholder="Voer uw wachtwoord in"
            />
          </div>

          {/* Login button */}
          <div className="flex">
            <button
              type="submit"
              className="flex-1 h-14 bg-white rounded-[25px] overflow-hidden group flex items-center justify-center"
            >
              <span className="font-['Press_Start_2P'] text-black">Login</span>
            </button>
            <button
              type="submit"
              className="h-14 w-14 bg-[#FF0080] rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 -mr-6"
            >
              <div className="w-6 h-6 relative pt-1">
                <Image
                  src="/images/pijl.svg"
                  alt="8-bit arrow"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 