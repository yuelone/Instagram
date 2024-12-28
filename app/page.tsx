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

const UserProfile: React.FC = () => {
  return (
    <div className="mt-8 ml-8 shadow-lg box-border p-2">
      <UserList
        account="yuelone_demo"
        avatar="/images/avatar/user.jpg"
        size="medium"
      />
      <p className="font-bold text-gray-400 mt-4 mx-4 mb-3 text-sm">
        Suggested for you
      </p>
      <UserList
        account="taeyeon_ss"
        avatar="/images/avatar/taeyeon.jpg"
        showFollow
        isFollowing
      />
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
          <UserProfile />
        </div>
      </div>
    </Container>
  );
};

export default Home;
