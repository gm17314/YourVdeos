import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Channelcard = ({ thumb, link, description, channel_name, views, time }) => {

  const [isHover, setIsHover] = useState(false);

  return (
    <div className="w-[90%] h-[22.5rem] rounded-md flex flex-col gap-4">
      <div className='w-full relative' onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <Link to={`/Play/${link}`} className='absolute w-full h-full bottom-0 z-1' />
        {isHover ?
          <iframe className='rounded-lg w-full h-48 z-0' src={`https://www.youtube.com/embed/${link}?autoplay=1&mute=1&modestbranding=0&controls=0`} title={channel_name} allow="autoplay" ></iframe>
         :
          <Link to={`/Play/${link}`} >
            <img src={thumb[thumb.length - 1].url} alt="" className="w-full h-48 rounded-lg" />
          </Link>
        }

      </div>
      <div className="flex w-full h-28 justify-between">
        <div className="flex flex-col gap-2 w-[100%]">
          <Link to={`/Play/${link}`} className=" md:text-[18px] font-semibold md:p-0 pl-2 dot h-50%">{description}</Link>
          <div className="flex flex-col">
            {/* <h2 className=" text-zinc-400 text-1xl">{channel_name}</h2> */}
            <div className="dark:text-zinc-200/95 text-zinc-500 md:text-lg text-sm md:p-0 pl-2">
              <span>{parseInt(views).toLocaleString()} views</span> &nbsp;&#9679;  <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channelcard
