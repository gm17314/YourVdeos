import React from 'react'
import SubscribeButton from './SubscribeButton'


const Subscribecard = ({channelId,channelName,channelSubscriber,channelLogo}) => {
console.log(channelId,channelLogo,channelName,channelSubscriber)
  return (
    <div className='flex flex-col items-center lg-[19rem] md:w-[15.5rem] sm:w-[17rem] w-[90%] p-2 gap-2 rounded-xl bg-[#d6d5d5] dark:bg-[#525252]'>
      <img className='w-[50%] rounded-full' src={channelLogo} alt="" />
      <a href={`/Channel/${channelId}`} className='text-black dark:text-white xl:text-[20px] lg:text-[18px] md:text-[19px] text-[20px] font-medium'>{channelName}</a>
      <span href='/' className='text-black dark:text-white xl:text-[20px] lg:text-[18px] md:text-[19px] text-[20px] font-medium'>{channelSubscriber}</span>
      <SubscribeButton channelId={channelId}
                channelName={channelName}
                channelSubscriber = {channelSubscriber + " subscribers"} 
                channelLogo={channelLogo} />
    </div>
  )
}

export default Subscribecard
