import React, { useState } from "react";
import { Link } from "react-router-dom";

const PlaySuggestionCard = ({
  thumb,
  link,
  description,
  channel_logo,
  channel_name,
  channelId,
  views,
  time,
}) => {

  const [isHover, setIsHover] = useState(false);

  return (
    <div className="w-[90%] h-[22.5rem] rounded-md flex flex-col xl:items-center gap-4">
      <div className="w-full relative" onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <Link to={`/Play/${link}`} className='absolute w-full h-full bottom-0 z-1' />
        {
          isHover ?
            <iframe className="w-full h-48 xl:h-56 rounded-lg z-0" src={`https://www.youtube.com/embed/${link}?autoplay=1&mute=1&modestbranding=0&controls=0`} title={channel_name} allow="autoplay" ></iframe>
          : <Link to={`/Play/${link}`}>
              <img
                src={thumb[thumb.length - 1].url}
                alt=""
                className="w-full h-48 xl:h-56 rounded-lg"
              />
            </Link>
        }
      </div>
      <div className="flex lg:w-[90%] h-28 justify-between">
        <div className="h-full flex pt-2 justify-start w-[19%]">
          <img
            src={channel_logo[channel_logo.length - 1].url}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-[81%]">
          <Link to={`/Play/${link}`} className="text-[18px] dot h-50%">
            {description}
          </Link>
          <div className="flex flex-col">
            <Link
              to={`/Channel/${channelId}`}
              className="dark:text-zinc-300 text-zinc-500 text-1xl"
            >
              {channel_name}
            </Link>
            <div className="dark:text-zinc-300 text-zinc-500 text-1xl">
              <span>{parseInt(views).toLocaleString()} views</span> &nbsp; &#9679;  <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaySuggestionCard;
