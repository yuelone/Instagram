interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-[1024px] mx-auto md:max-w-full">{children}</div>;
};

export default Container;
