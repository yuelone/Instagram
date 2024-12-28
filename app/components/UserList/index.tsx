type UserListProps = {
  size?: "medium" | "small";
  showFollow?: boolean;
  isFollowing?: boolean;
  account?: string;
  subtitle?: string;
  avatar?: string;
  id?: number;
};

const UserList: React.FC<UserListProps> = ({
  size = "small",
  showFollow = false,
  isFollowing = false,
  account,
  subtitle,
  avatar,
  id,
}) => {
  return (
    <div className="flex h-[70px] items-center box-border px-4">
      <div
        className={`${
          size === "small" ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"
        } overflow-hidden rounded-full`}
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="ml-4">
        <p className="font-bold text-sm">{account}</p>
        <p className="text-gray-400 text-xs">
          {subtitle}
          {showFollow && " is following"}
        </p>
      </div>
      {showFollow ? (
        <p
          className={`${
            isFollowing ? "text-gray-700" : "text-blue-400"
          } ml-auto text-xs font-bold cursor-pointer`}
        >
          {isFollowing ? "FOLLOWING" : "FOLLOW"}
        </p>
      ) : (
        <svg
          className="ml-auto text-xs font-bold cursor-pointer"
          aria-label="更多選項"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>更多選項</title>
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      )}
    </div>
  );
};

export default UserList;
