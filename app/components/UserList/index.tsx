"use client";

import React, { useEffect } from "react";

import { useAppDispatch } from "hook/customReduxHook";
import { useUpdateSuggestedMutation } from "services/home";
import { updateSuggested } from "slices/suggested";

import Loading from "components/Loading";

type UserListProps = {
  size?: "medium" | "small";
  showFollow?: boolean;
  isFollowing?: boolean;
  account?: string;
  verify?: boolean;
  subtitle?: string;
  avatar?: string;
  more?: boolean;
  id?: string;
};

const UserList: React.FC<UserListProps> = ({
  size = "small",
  showFollow = false,
  isFollowing = false,
  account,
  verify,
  subtitle,
  avatar,
  more,
  id,
}) => {
  const dispatch = useAppDispatch();

  const [
    updateSuggestedIsFollowing,
    {
      isLoading: serviceUpdateSuggestedLoading,
      data: serviceUpdateSuggestedData,
    },
  ] = useUpdateSuggestedMutation();

  const handleSuggestedIsFollowing = () => {
    updateSuggestedIsFollowing({ id });
  };

  useEffect(() => {
    if (!serviceUpdateSuggestedLoading && serviceUpdateSuggestedData) {
      const { id, isFollowing } = serviceUpdateSuggestedData;
      dispatch(
        updateSuggested({
          id,
          updateData: { isFollowing },
        })
      );
    }
  }, [serviceUpdateSuggestedLoading, serviceUpdateSuggestedData]);

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
        <p className="flex items-center font-bold text-sm">
          {account}
          {verify && (
            <>
              <span className="ml-1" />
              <svg
                aria-label="已驗證"
                fill="rgb(0, 149, 246)"
                height="12"
                role="img"
                viewBox="0 0 40 40"
                width="12"
              >
                <title>已驗證</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </>
          )}
        </p>
        <p className="text-gray-400 text-xs">
          {subtitle}
          {showFollow && subtitle && " is following"}
        </p>
      </div>
      {showFollow && (
        <p
          className={`${
            isFollowing ? "text-gray-700" : "text-blue-400"
          } ml-auto text-xs font-bold cursor-pointer`}
          onClick={handleSuggestedIsFollowing}
        >
          {serviceUpdateSuggestedLoading && <Loading />}
          {isFollowing && !serviceUpdateSuggestedLoading
            ? "FOLLOWING"
            : "FOLLOW"}
        </p>
      )}
      {more && (
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
