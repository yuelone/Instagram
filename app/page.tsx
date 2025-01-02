"use client";

import React, { useEffect } from "react";

import { useAppDispatch } from "hook/customReduxHook";
import { setSuggestedList } from "slices/suggested";
import { useSuggestedData } from "selector/suggested";

import Container from "components/Container";
import Loading from "components/Loading";
import UserList from "components/UserList";
import PostsList from "components/PostsList";

import {
  useGetLimitedTimePostQuery,
  useGetPostQuery,
  useGetSuggestedQuery,
} from "services/home";

const LimitedTimePost: React.FC = () => {
  const { isLoading: limitedTimePostDataLoading, data: limitedTimePostData } =
    useGetLimitedTimePostQuery();

  return (
    <div className="w-full h-[110px] box-border flex items-center overflow-x-auto overflow-y-hidden shadow-md no-scrollbar lg:my-8">
      {limitedTimePostDataLoading && !limitedTimePostData && (
        <div className="flex justify-center w-full">
          <Loading />
        </div>
      )}
      {!limitedTimePostDataLoading &&
        limitedTimePostData &&
        limitedTimePostData.map((item) => (
          <div className="text-center" key={item.id}>
            <div
              className="w-[56px] h-[56px] p-[3px] ring-2 border-2 border-white ring-red-500 rounded-full mx-[11px] overflow-hidden"
              style={{
                backgroundImage: `url(${item.avatar})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <p className="text-xs mt-1 text-center w-[56px] truncate overflow-hidden whitespace-nowrap mx-auto">
              {item.account}
            </p>
          </div>
        ))}
    </div>
  );
};

const UserProfile: React.FC = () => {
  const { isLoading: serviceSuggestedLoading, data: serviceSuggestedData } =
    useGetSuggestedQuery();

  const dispatch = useAppDispatch();

  const suggestedData = useSuggestedData();

  useEffect(() => {
    if (!serviceSuggestedLoading && serviceSuggestedData) {
      dispatch(setSuggestedList(serviceSuggestedData));
    }
  }, [serviceSuggestedLoading, serviceSuggestedData]);

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
      {serviceSuggestedLoading && !serviceSuggestedData && (
        <div className="flex justify-center w-full">
          <Loading />
        </div>
      )}
      {!serviceSuggestedLoading &&
        suggestedData &&
        suggestedData.map((item) => (
          <UserList
            key={item.id}
            id={item.id}
            account={item.account}
            avatar={item.avatar}
            subtitle={item.subtitle}
            showFollow
            isFollowing={item.isFollowing}
          />
        ))}
    </div>
  );
};

const Home: React.FC = () => {
  const { isLoading: postLoading, data: postData } = useGetPostQuery();

  return (
    <Container>
      <div className="flex lg:justify-center">
        <div className="w-full lg:w-[600px]">
          <LimitedTimePost />
          {postLoading && !postData && (
            <div className="flex justify-center w-full">
              <Loading />
            </div>
          )}
          {!postLoading &&
            postData &&
            postData.map((item) => (
              <PostsList
                key={item.id}
                photos={item.photos}
                account={item.account}
                verify={item.verify}
                subtitle={item.subtitle}
                avatar={item.avatar}
                description={item.description}
                likes={item.likes}
                createTime={item.createTime}
                hashTags={item.hashTags}
              />
            ))}
        </div>
        <div className="hidden lg:block lg:w-[424px]">
          <UserProfile />
        </div>
      </div>
    </Container>
  );
};

export default Home;
