import Image from 'next/image';
import LeaderboardRow from '@/components/LeaderboardRow';
// Attempting to re-trigger module resolution

import Link from 'next/link';

const dummyData = [
  { rank: 1, name: 'hugo vermeer', streak: 13, punten: 3450, highlight: false },
  { rank: 2, name: 'hugo vermeer', streak: null, punten: 3250, highlight: false },
  { rank: 3, name: 'hugo vermeer', streak: null, punten: 3150, highlight: false },
  { rank: 4, name: 'hugo vermeer', streak: null, punten: 3000, highlight: false },
  { rank: 5, name: 'Finn Ruijter', streak: 17, punten: 2750, highlight: true },
  { rank: 6, name: 'hugo vermeer', streak: 9, punten: 2600, highlight: false },
  { rank: 7, name: 'hugo vermeer', streak: null, punten: 2500, highlight: false },
  { rank: 8, name: 'hugo vermeer', streak: 11, punten: 2050, highlight: false },
  { rank: 9, name: 'hugo vermeer', streak: null, punten: 1850, highlight: false },
  { rank: 10, name: 'hugo vermeer', streak: 17, punten: 1200, highlight: false },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-[#220028] flex flex-col items-center relative overflow-hidden p-4">
      {/* Curl achtergrond */}
      <Image src="/images/curl.png" alt="curl" fill priority className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none" />

      {/* Top balk */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-8 pt-4">
        {/* Terug knop en titel */}
        <div className="flex items-center gap-8 pl-4">
          <Link href="/dashboard" aria-label="Terug naar dashboard" tabIndex={0} className="mt-1">
            <Image src="/images/pijl-links.png" alt="Terug pijl" width={30} height={30} className="object-contain" />
          </Link>
          <span className="text-white font-['Poppins'] text-xl font-light">5/30 plaats</span>
        </div>
        {/* Week knop */}
        <button className="bg-[#FF0080] text-white font-['Press_Start_2P'] text-sm px-4 py-2 rounded-full shadow-md">week 1</button>
      </div>

      {/* Leaderboard content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 px-6 py-4 font-['Poppins'] font-semibold text-sm rounded-t-xl text-white">
          <div className="col-span-1">naam</div>
          <div className="col-span-1 text-center">streak</div>
          <div className="col-span-1 text-right">punten</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col mt-4">
          {dummyData.map((entry, index) => (
            <LeaderboardRow key={index} {...entry} />
          ))}
        </div>
      </div>
    </div>
  );
} 