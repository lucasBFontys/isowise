import Image from 'next/image';

type LoginStyleButtonProps = {
  label: string;
  onClick?: () => void;
  leftArrow?: boolean;
};

const LoginStyleButton = ({ label, onClick, leftArrow = false }: LoginStyleButtonProps) => (
  <div className="flex w-full max-w-md mx-auto">
    {leftArrow && (
      <button
        type="button"
        className="h-14 w-14 bg-[#FF0080] rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 md:-ml-6"
        tabIndex={-1}
        aria-hidden="true"
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
    )}
    <button
      type="button"
      className="flex-1 h-14 bg-white rounded-[25px] overflow-hidden group flex items-center justify-center focus:outline-none"
      onClick={onClick}
      tabIndex={0}
      aria-label={label}
    >
      <span className="font-['Press_Start_2P'] text-black">{label}</span>
    </button>
    {!leftArrow && (
      <button
        type="button"
        className="h-14 w-14 bg-[#FF0080] rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 md:-mr-6"
        tabIndex={-1}
        aria-hidden="true"
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
    )}
  </div>
);

export default LoginStyleButton; 