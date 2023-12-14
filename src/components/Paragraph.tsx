interface Props {
  children: React.ReactNode;
}

export const Paragraph = ({ children }: Props) => {
  return <p className="text-xs font-light pb-3">{children}</p>;
};
