import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SearchCard = ({
    thumb,
    link,
    description,
    channelId,
    channel_name,
    views,
    time, title
}) => {

    return (
        <div className="w-[90%] lg:h-56 md:h-48 rounded-md flex md:flex-row flex-col lg:gap-8 md:gap-3 gap-4 items-center ">
            <Link to={`/Play/${link}`} className="md:h-full h-[50%] lg:w-[30%] md:w-[35%] w-full">
                <img
                    src={thumb}
                    alt=""
                    className=" w-full h-full rounded-lg"
                />
            </Link>
            <div className="flex flex-col md:w-[65%] w-full lg:h-52 md:h-full md:gap-2">
                <Link to={`/Play/${link}`} className="xl:text-[20px] text-[18px] dot font-semibold">
                    {title}
                </Link>
                <div className="dark:text-zinc-300 text-zinc-600 xl:text-[17px] lg:text-[15px] text-[17px]  font-medium">
                    <span>{parseInt(views).toLocaleString()} views</span> &nbsp;<span>&#9679; {time}</span>
                </div>
                <Link to={`/Channel/${channelId}`} className="dark:text-zinc-300 text-zinc-600 xl:text-[17px] lg:text-[15px] md:text-[16px] text-[18px] font-medium">
                    {channel_name}
                </Link>
                <p className="dot dark:text-zinc-300 text-zinc-600 xl:text-[17px] lg:text-[16px] md:text-[17px] text-[18px]">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SearchCard;
