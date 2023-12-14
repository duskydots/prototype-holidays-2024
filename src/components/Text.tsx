interface Props {
  children?: React.ReactNode;
}

export const Text = ({ children }: Props) => {
  return <div className="text-xs py-3 text-center">{children}</div>;
};
