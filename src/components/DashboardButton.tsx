import Image from 'next/image';

type DashboardButtonProps = {
  label: string;
  leftArrow?: boolean;
};

const DashboardButton = ({ label, leftArrow = false }: DashboardButtonProps) => (
  <button
    className="w-full flex items-center justify-between bg-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0080] group shadow-md"
    tabIndex={0}
    aria-label={label}
  >
    {leftArrow && (
      <span className="flex items-center justify-center -ml-6">
        <span className="bg-[#FF0080] rounded-full w-14 h-14 flex items-center justify-center">
          <Image src="/images/pijl.svg" alt="arrow" width={32} height={32} className="object-contain" />
        </span>
      </span>
    )}
    <span className="font-['Press_Start_2P'] text-black text-lg tracking-wider lowercase mx-2">
      {label}
    </span>
    {!leftArrow && (
      <span className="flex items-center justify-center -mr-6">
        <span className="bg-[#FF0080] rounded-full w-14 h-14 flex items-center justify-center">
          <Image src="/images/pijl.svg" alt="arrow" width={32} height={32} className="object-contain" />
        </span>
      </span>
    )}
  </button>
);

export default DashboardButton; 