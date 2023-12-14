interface Props {
  children: React.ReactNode;
}

export const Heading = ({ children }: Props) => {
  return <h1 className="text-base font-medium pb-3">{children}</h1>;
};
