"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import UserList from "components/UserList";

import PostContent from "./PostContent";

type PostProps = {
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
  photos: string[];
  likes: number;
  description: string;
  hashTags: string[];
  createTime: string;
};

const PostsList: React.FC<PostProps> = ({
  account,
  avatar,
  photos,
  verify,
  subtitle,
  likes,
  description,
  hashTags,
  createTime,
}) => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: number, next: number) => {
      if (current !== next) setCurrentSlide(next);
    },
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  return (
    <div className="shadow-md pb-4 lg:mb-8">
      <UserList
        account={account}
        avatar={avatar}
        verify={verify}
        subtitle={subtitle}
        more
      />
      {photos.length === 1 ? (
        <Image
          style={{ maxWidth: "100%", width: "auto", height: "auto" }}
          src={photos[0]}
          alt={`Post image by ${account}`}
          width={2100}
          height={300}
          loading="lazy"
        />
      ) : (
        <div className="relative">
          <Slider {...sliderSettings} ref={sliderRef}>
            {photos.map((photo, index) => (
              <div key={index}>
                <Image
                  style={{ maxWidth: "100%", width: "auto", height: "auto" }}
                  src={photo}
                  alt={`Post image by ${account} - ${index + 1}`}
                  width={2100}
                  height={300}
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className={`text-white text-xl bg-black bg-opacity-50 p-2 rounded-full ${
                currentSlide > 0 ? "" : "invisible"
              }`}
            >
              {"<"}
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className={`text-white text-xl bg-black bg-opacity-50 p-2 rounded-full ${
                currentSlide < photos.length - 1 ? "" : "invisible"
              }`}
            >
              {">"}
            </button>
          </div>
        </div>
      )}
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
