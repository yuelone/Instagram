type IUserListProps = {
  size?: "medium" | "small";
  showFollow?: boolean;
  isFollowing?: boolean;
  account?: string;
  relatedfollowing?: string;
  avatar?: string;
  id?: number;
};

const UserList: React.FC<IUserListProps> = ({
  size = "small",
  showFollow = false,
  isFollowing = false,
  account,
  relatedfollowing,
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
        <p className="text-gray-400 text-xs">{relatedfollowing} 也在追蹤</p>
      </div>
      {showFollow && (
        <p
          className={`${
            isFollowing ? "text-gray-700" : "text-blue-400"
          } ml-auto text-xs font-bold cursor-pointer`}
        >
          {isFollowing ? "FOLLOWING" : "FOLLOW"}
        </p>
      )}
    </div>
  );
};

export default UserList;
