import LoginStyleButton from '@/components/LoginStyleButton';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
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
        <Link href="/Quiz">
          <LoginStyleButton label="play" />
        </Link>
        </div>
        <div className="w-full max-w-xs -mr-12">
          <LoginStyleButton label="profiel" leftArrow />
        </div>
        <div className="w-full max-w-xs">
          <LoginStyleButton label="handleiding" />
        </div>
      </div>
    </div>
  );
} 