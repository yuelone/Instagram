import Container from "components/Container";
import UserList from "components/UserList";
import PostsList from "components/PostsList";

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
          <PostsList
            photo="/images/post/taeyeonPostImg_1.jpg"
            account="taeyeon_ss"
            avatar="/images/avatar/taeyeon.jpg"
            description="🎁"
            likes={345000}
            createTime="3 days ago"
          />
        </div>
        <div className="hidden lg:block lg:w-[424px]">
          <UserList
            avatar="/images/avatar/taeyeon.jpg"
            account="taeyeon_ss"
            subtitle="xxx_xxx"
            showFollow
            isFollowing
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;
