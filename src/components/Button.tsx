interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button
      className="relative border-rainbow-gradient font-medium text-xs rounded-full backdrop-blur-sm transition-colors z-[0]"
      onClick={onClick}
    >
      <div className="relative flex whitespace-nowrap items-center justify-center gap-2 text-white z-[1] bg-black/90 hover:bg-black/50 py-3 px-5 rounded-full transition-colors backdrop-blur-lg">
        {children}
      </div>
    </button>
  );
};
