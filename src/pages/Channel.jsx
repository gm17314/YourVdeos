import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../fetchApi";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Channelcard from "../component/Channelcard";
import SubscribeButton from "../component/SubscribeButton";
import { useQuery } from "react-query";

const Channel = () => {
  const { channelID } = useParams();
  const [category, setCategory] = useState('videos')
  const array = Array(12).fill(0);

  const getDataFromApi = async () => {
    const apiData = await fetchFromAPI(`channel/${category}?id=${channelID}`);
    return apiData
    // setChannelData.meta(apiData.meta);
    // setVideoData(apiData.data);
  };

  const { isLoading, data} = useQuery([channelID,category], getDataFromApi,{ cacheTime: 1800000, staleTime: 1800000 });

  // console.log(data?.meta)

  return (
    <div className="flex flex-col gap-6 xl:gap-10">
      <div className="w-[99%] 2xl:h-72 xl:h-64 md:h-60 h-28">
        <img
          src={data?.meta?.banner[data?.meta?.banner.length - 1].url}
          alt=""
          className="w-full h-full"
        />
      </div>

      <div className="flex items-center w-full md:h-56  gap-4  md:flex-row flex-col">
        <div className="md:h-full flex pt-2 justify-center items-center md:w-[13%] w-[20%] ">
          <img
            src={data?.meta?.avatar[data?.meta?.avatar.length - 1].url}
            alt=""
            className=" rounded-full"
          />
        </div>
        <div className="flex flex-col md:items-start items-center  gap-2 md:w-[81%] w-[95%] ">
          <h2 className="md:text-2xl text-lg font-semibold flex md:flex-row flex-col items-center gap-1 md:gap-4 lg:gap-8">
            {data?.meta?.title}{" "}
            <span>
              <SubscribeButton
                channelId={data?.meta?.channelId}
                channelName={data?.meta?.title}
                channelSubscriber={data?.meta?.subscriberCountText + " subscribers"}
                channelLogo={
                  data?.meta?.avatar[
                    data?.meta?.avatar.length - 1
                  ].url
                }
              />
            </span>
          </h2>

          <div className=" ">
            <span href="/" className="dark:text-zinc-200 text-zinc-600 font-medium text-sm md:text-[16px]">
              {data?.meta?.channelHandle}
            </span>{" "}
            &nbsp;{" "}
            <span className="dark:text-zinc-200 text-zinc-600 font-medium text-sm md:text-[15px]">
              {data?.meta?.subscriberCountText} subscriber
            </span>{" "}
            &nbsp;{" "}
            <span className="dark:text-zinc-200 text-zinc-600 font-medium text-sm md:text-[15px]">
              {data?.meta?.videosCount} videos
            </span>
          </div>
          <p className="md:text-[16px] text-sm md:text-start text-center  dot h-50% text-zinc-500/85 dark:text-zinc-200/90">
            {data?.meta?.description}
          </p>
        </div>
      </div>

      <div className="px-1  pl-4  flex items-center md:justify-normal justify-center lg:gap-6 md:gap-3 gap-5 border-b border-b-black text-zinc-600 dark:text-white">
        <button onClick={() => setCategory("videos")} className={`border-0 text-[16px] md:text-[20px] ${category === "videos" ? "border-b-2 border-black" : ""} dark:border-white pb-2`}>Videos</button>
        <button onClick={() => setCategory("playlists")} className={`border-0 text-[16px] md:text-[20px] ${category === "playlists" ? "border-b-2 border-black" : ""} dark:border-white pb-2`}>Playlist</button>
        <button onClick={() => setCategory("liveStreams")} className={`border-0 text-[16px] md:text-[20px] ${category === "liveStreams" ? "border-b-2 border-black" : ""} dark:border-white pb-2`}>Live Streams</button>
        <button onClick={() => setCategory("shorts")} className={`border-0 text-[16px] md:text-[20px] ${category === "shorts" ? "border-b-2 border-black" : ""} dark:border-white pb-2`}>Shorts</button>
      </div>

      {/* {console.log(videoData)} */}
      <div className="w-full grid justify-items-center 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {isLoading
          ? array.map((elm, index) => (
            <div key={index} className="items-center w-full h-96 flex flex-col">
              <div className="loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]" />
              <SkeletonTheme highlightColor="#aaa" baseColor="#9b9b9b">
                <div className=" xl:w-[23rem] lg-[21rem] md:w-[17rem] sm:w-[19rem] w-[90%] h-96 rounded-md flex flex-col gap-4">
                  <Skeleton className="h-28" borderRadius="8px" />
                  <div className="flex w-full h-28 justify-between">
                    <div className="h-full flex pt-2 justify-start w-[19%]">
                      <Skeleton circle className="h-12 w-12" />
                    </div>
                    <div className="flex flex-col gap-2 w-[81%]">
                      <Skeleton className="h-8" />
                      <Skeleton className="h-8" />
                      <Skeleton className="h-8" />
                    </div>
                  </div>
                </div>
              </SkeletonTheme>
            </div>
          ))
          : data?.data?.map(
            ({
              videoId,
              title,
              channelTitle,
              publishedTimeText,
              viewCount,
              thumbnail,
              channelId,
            }) => {
              if (thumbnail) {
                return (
                  <Channelcard
                    key={videoId}
                    thumb={thumbnail}
                    link={videoId}
                    description={title}
                    channel_name={channelTitle}
                    channel_logo={["", ""]}
                    views={viewCount}
                    time={publishedTimeText}
                    channelId={channelId}
                  />
                );
              }

              return null;
            }
          )}
      </div>
    </div>
  );
};

export default Channel;
