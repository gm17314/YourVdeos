import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ thumb, link, description, channel_logo, channel_name, views, time, channelId }) => {

  const [isHover, setIsHover] = useState(false);

  return (
    <div className="xl:w-[23rem] lg-[21rem] md:w-[17rem] sm:w-[19rem] w-[90%] h-96 rounded-md flex flex-col gap-4">

      <div className='w-full' onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

        {isHover ?

          <iframe className='rounded-lg w-full h-48' src={`https://www.youtube.com/embed/${link}?autoplay=1&mute=1&modestbranding=0&controls=0`} title={channel_name} allow="autoplay" ></iframe>
        :
          <Link to={`/Play/${link}`} >
            <img src={thumb[thumb.length - 1].url} alt="" className="w-full h-48 rounded-lg" />
          </Link>

        }

      </div>

      <div className="flex w-full h-28 justify-between">
        <div className="h-full flex pt-2 justify-start w-[19%]">
          <img src={channel_logo ? channel_logo[channel_logo.length - 1].url:"https://static.vecteezy.com/system/resources/previews/008/506/404/original/contact-person-red-icon-free-png.png"} alt="" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex flex-col gap-2 w-[81%]">
          <Link to={`/Play/${link}`} className="text-[18px] dot h-50%">{description}</Link>
          <div className="flex flex-col">
            <Link to={`/Channel/${channelId}`} className="text-zinc-700 dark:text-zinc-300/80 text-1xl">{channel_name}</Link>
            <div className="text-zinc-700 dark:text-zinc-300/80 text-1xl">
              <span>{parseInt(views).toLocaleString()} views</span> &nbsp; <span>{time}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VideoCard;

