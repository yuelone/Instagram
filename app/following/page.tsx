"use client";

import React, { useEffect } from "react";

import { useAppDispatch } from "hook/customReduxHook";

import { setFollowingUsers } from "slices/following";

import { useFollowingData } from "selector/following";

import Container from "components/Container";
import Loading from "components/Loading";
import UserList from "components/UserList";

import { useGetFollowingQuery } from "services/following";

const Following: React.FC = () => {
  const {
    isLoading: serviceFollowingLoading,
    data: serviceFollowingData,
    refetch,
  } = useGetFollowingQuery();

  const dispatch = useAppDispatch();

  const followingData = useFollowingData();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!serviceFollowingLoading && serviceFollowingData) {
      dispatch(setFollowingUsers(serviceFollowingData));
    }
  }, [serviceFollowingLoading, serviceFollowingData]);

  return (
    <Container>
      <p className="my-8 font-bold text-2xl px-4 box-border">Following</p>
      {serviceFollowingLoading && !serviceFollowingData && (
        <div className="flex justify-center w-full">
          <Loading />
        </div>
      )}
      {!serviceFollowingLoading &&
        followingData &&
        followingData.map((item) => (
          <UserList
            key={item.id}
            id={item.id}
            type="following"
            account={item.account}
            verify={item.verify}
            avatar={item.avatar}
            showFollow
            isFollowing={item.isFollowing}
          />
        ))}
    </Container>
  );
};

export default Following;
