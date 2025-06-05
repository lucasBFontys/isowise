import Image from 'next/image';

type LeaderboardRowProps = {
  rank: number;
  name: string;
  streak: number | null;
  punten: number;
  highlight: boolean;
};

const LeaderboardRow = ({ rank, name, streak, punten, highlight }: LeaderboardRowProps) => {
  const rankBlockClass = rank === 1
    ? 'bg-[#FF0080]'
    : rank <= 3
      ? 'bg-[#FF0080]'
      : 'bg-white';

  const rankTextColor = rank <= 3
    ? 'text-white'
    : 'text-black';

  const rowContainerClass = highlight
    ? 'text-white'
    : 'text-black';

  const fireIconSrc = (streak !== null && streak > 0) ? '/images/oranjevuur.png' : '/images/grijsvuur.png';
  const displayStreak = streak !== null ? streak : 0;

  return (
    <div className={`flex items-center gap-4 mb-4 last:mb-0 relative h-16 ${rowContainerClass}`}>
      {/* Kroon (gepositioneerd boven rank blok) */}
      {rank === 1 && (
        <Image
          src="/images/kroontje.png"
          alt="Kroon"
          width={100}
          height={100}
          className="absolute -top-13 -left-11 object-contain z-10"
        />
      )}

      {/* Rank Block */}
      <div className={`${rankBlockClass} ${rankTextColor} flex flex-col items-center justify-center w-16 flex-grow-0 flex-shrink-0 rounded-md font-bold text-lg text-center h-full`}>
        <span>{rank}</span>
      </div>

      {/* Data Block */}
      <div className={`${highlight ? 'bg-[#FF0080]' : 'bg-white'} flex-1 flex items-center justify-between px-6 rounded-xl shadow h-full`}>
        {/* Naam */}
        <div className="flex-1 pr-4">
          <span className={highlight || rank === 1 ? 'font-bold' : ''}>{name}</span>
        </div>

        {/* Streak */}
        <div className="flex flex-col items-center justify-center w-24">
          {/* Container voor vuur icoon en nummer */}
          <div className="flex flex-col items-center justify-center">
            <Image
              src={fireIconSrc}
              alt="Streak icoon"
              width={24}
              height={24}
              className="object-contain"
            />
            {displayStreak > 0 && (
              <span className="text-xs font-bold text-black">
                {displayStreak}
              </span>
            )}
          </div>
        </div>

        {/* Punten */}
        <div className="text-right w-20">
          <span className={highlight || rank === 1 ? 'font-bold' : ''}>{punten}</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardRow; 