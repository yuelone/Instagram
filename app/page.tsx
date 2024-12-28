import Container from "components/Container";

const LimitedTimePost: React.FC = () => {
  return (
    <div className="w-full h-[110px] box-border flex items-center overflow-x-auto overflow-y-hidden shadow-md no-scrollbar lg:my-8">
      <div className="text-center">
        <div
          className="w-[56px] h-[56px] p-[3px] ring-2 border-2 border-white ring-red-500 rounded-full mx-[11px] overflow-hidden"
          style={{
            backgroundImage: "url('/images/avatar/taeyeon.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <p className="text-xs mt-1">taeyeon_ss</p>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <Container>
      <div className="flex lg:justify-center">
        <div className="w-full lg:w-[600px]">
          <LimitedTimePost />
        </div>
        <div className="hidden lg:block lg:w-[424px]">right</div>
      </div>
    </Container>
  );
};

export default Home;
