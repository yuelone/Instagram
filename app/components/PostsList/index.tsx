import Image from "next/image";

import UserList from "components/UserList";

import PostContent from "./PostContent";

type PostProps = {
  account: string;
  avatar: string;
  photo: string;
  likes: number;
  description: string;
  hashTags?: string;
  createTime: string;
};

const PostsList: React.FC<PostProps> = ({
  account,
  avatar,
  photo,
  likes,
  description,
  hashTags,
  createTime,
}) => {
  return (
    <div className="shadow-md pb-4 lg:mb-8">
      <UserList account={account} avatar={avatar} />
      <Image
        src={photo}
        alt={`Post image by ${account}`}
        width={600}
        height={300}
      />
      <PostContent
        account={account}
        likes={likes}
        description={description}
        hashTags={hashTags}
        createTime={createTime}
      />
    </div>
  );
};

export default PostsList;
