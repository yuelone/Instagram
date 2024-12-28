import Container from "components/Container";
import UserList from "components/UserList";

const Following: React.FC = () => {
  return (
    <Container>
      <p className="my-8 font-bold text-2xl px-4 box-border">Following</p>
      <div className="shadow-md mt-8 mx-2 box-border">
        <UserList
          account="taeyeon_ss"
          avatar="/images/avatar/taeyeon.jpg"
          showFollow
          isFollowing
        />
      </div>
    </Container>
  );
};

export default Following;
