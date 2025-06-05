'use client';

import LoginStyleButton from '@/components/LoginStyleButton';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import CategorySelect from '@/components/CategorySelect';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const handlePlayClick = () => {
    setShowCategorySelect(true);
  };

  const handleCategorySelected = (categoryId: string) => {
    // Navigate to the quiz page with the selected category
    router.push(`/Quiz?category=${categoryId}`);
  };

  if (showCategorySelect) {
    return <CategorySelect onCategorySelect={handleCategorySelected} />;
  }

  return (
    <div className="min-h-screen bg-[#220028] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Curl achtergrond */}
      <Image src="/images/curl.png" alt="curl" fill priority className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none" />

      {/* Trofee knop rechts, net boven het midden en strak tegen de zijkant */}
      <Link
        href="/leaderboard"
        className="fixed right-0 top-1/2 -translate-y-2/3 z-20 bg-[#FF0080] rounded-l-2xl w-24 h-24 flex items-center justify-center shadow-lg hover:scale-105 transition-transform overflow-visible"
        aria-label="Trofee"
        tabIndex={0}
      >
        <div className="pointer-events-none flex items-center justify-center h-full w-full">
          <Image
            src="/images/trofee.png"
            alt="Leaderboard"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </Link>

      {/* Titel */}
      <div className="z-10 text-center mb-20">
        <h1 className="text-[5rem]">
          <span className="font-['Press_Start_2P'] text-white">ISO</span>
          <span className="font-['Poppins'] text-white font-light">wise</span>
        </h1>
      </div>

      {/* Knoppen */}
      <div className="z-10 flex flex-col gap-4 w-full max-w-md items-center justify-center">
        <div className="w-full max-w-xs">
          {/* Changed from Link to a button to show CategorySelect */} 
          <LoginStyleButton label="play" onClick={handlePlayClick} />
        </div>
        <div className="w-full max-w-xs -mr-12">
          <LoginStyleButton label="profiel" leftArrow onClick={handleProfileClick} />
        </div>
        <div className="w-full max-w-xs">
          <LoginStyleButton label="handleiding" />
        </div>
      </div>

      {/* Profile Section */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-[#220028] shadow-lg transform transition-transform duration-300 z-30
        ${isProfileOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Profile content goes here */}
        <div className="p-6 flex flex-col items-center h-full overflow-y-auto">
          {/* Close button */}
          <button onClick={handleCloseProfile} className="self-start text-white text-2xl mb-4" aria-label="Close profile">←</button>

          {/* Profile Picture and Edit Icon */}
          <div className="relative w-95 h-50 rounded-xl overflow-hidden mb-4 bg-roze">
            <div className="flex mt-7 justify-center">
            <Image
              src="/images/profiel-foto.png" // Placeholder for pixel avatar
              alt="Profile picture"
              width={180}
              height={180}
              
            />
            </div>
            {/* Edit Icon */}
            <div className="absolute top-2 right-2  bg-opacity-50 rounded-full p-1">
              <Image
                src="/images/pencil.png" // Placeholder for pixel pencil icon
                alt="Edit profile"
                width={50}
                height={50}
              />
            </div>
          </div>

          {/* User Info */}
          <div className={`text-white text-center mb-8 ${poppins.className}`}>
            <h2 className="text-2xl font-bold">Finn Ruijter</h2> {/* Modern sans-serif */}
            <p className="text-sm text-gray-300">Finnruijter1989</p>
            <p className="text-xs text-gray-400">aangesloten mei 2025</p>
            {/* Flag Placeholder */}
            <Image
              src="/images/netherlands.png" // Placeholder for Dutch flag
              alt="Dutch flag"
              width={20}
              height={15}
              className="mt-2 mx-auto"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
            {/* Antwoordreeks */}
            <div className="bg-roze rounded-lg p-4 flex flex-col items-center text-center">
              <Image src="/images/pixel-vuur.png" alt="Streak icon" width={30} height={30} />
              <span className="text-xl font-bold mt-1 text-white">17</span>
              <span className="text-xs text-gray-400">Antwoordreeks</span>
            </div>
            {/* Punten */}
            <div className="bg-roze rounded-lg p-4 flex flex-col items-center text-center">
              <Image src="/images/coin.png" alt="Points icon" width={30} height={30} />
              <span className="text-xl font-bold mt-1 text-white">2750</span>
              <span className="text-xs text-gray-400">punten</span>
            </div>
            {/* Plaats */}
            <div className="bg-roze rounded-lg p-4 flex flex-col items-center text-center">
              <Image src="/images/pixel-medaille.png" alt="Rank icon" width={30} height={30} />
              <span className="text-xl font-bold mt-1 text-white">5/30</span>
              <span className="text-xs text-gray-400">plaats</span>
            </div>
            {/* Binnen top 3 */}
            <div className="bg-roze rounded-lg p-4 flex flex-col items-center text-center">
              <Image src="/images/pixel-trofee.png" alt="Top 3 icon" width={30} height={30} />
              <span className="text-xl font-bold mt-1 text-white">1</span>
              <span className="text-xs text-gray-400">binnen top 3</span>
            </div>
          </div>

          {/* Topscore */}
          <div className="bg-roze rounded-lg p-4 w-full max-w-sm flex flex-col items-center text-center mb-8">
             <Image src="/images/pixel-kroon.png" alt="Topscore icon" width={40} height={40} />
             <span className="text-2xl font-bold mt-1 text-white">4300</span>
             <span className="text-sm text-gray-400">topscore</span>
          </div>

          {/* Geluidseffecten and Slider */}
          <div className={`w-full max-w-sm ${poppins.className}`}>
             <p className="text-sm font-bold mb-2 text-white">geluidseffecten</p>
             {/* Slider Placeholder */}
             <div className="w-full h-2 bg-gray-300 rounded-full">
                {/* Actual slider implementation would go here */}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
} 