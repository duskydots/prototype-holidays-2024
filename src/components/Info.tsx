interface Props {
  children?: React.ReactNode;
}

export const Info = ({ children }: Props) => {
  return (
    <div className="text-xs backdrop-blur-md px-4 bg-black/10 border border-white/10 rounded-full py-3 text-center">
      {children}
    </div>
  );
};
