interface Props {
  children: React.ReactNode;
}

export const SubHeading = ({ children }: Props) => {
  return <h2 className="text-base font-medium pb-3">{children}</h2>;
};
