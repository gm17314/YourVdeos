import React, { useContext, useEffect, useState } from 'react'
import VideoCard from '../component/VideoCard'
import { CountryCodeContext } from '../CountryCodeContext';
import { TrendingVdoContext } from '../trendingVdoContext';
import { fetchFromAPI } from "../fetchApi"
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Trending = () => {

  const { trendingVdos, updateTrendingVdos } = useContext(TrendingVdoContext);
  const { countryCode } = useContext(CountryCodeContext);
  const [loading, setLoading] = useState(false);
  const array = Array(12).fill(0)

  useEffect(() => {
    const getDataFromApi = async () => {
      setLoading(true);
      const apiData = await fetchFromAPI(`trending?geo=${countryCode}`);
      updateTrendingVdos(apiData.data);
      setLoading(false);
    };

    // Check if the trending videos data is already available and if data is already available then api call karne ki need nhi ha
    if (trendingVdos.length === 0) {
      getDataFromApi();
    }
    // console.log(trendingVdos)
    // eslint-disable-next-line
  }, [countryCode, trendingVdos]);

  return (
    <>
    <h2 className="text white md:text-4xl text-3xl  font-semibold xl:pl-5 lg:pl-3 md:pl-8 pl-6">Trending </h2>
    <div className='w-full pt-8 grid justify-items-center 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1'>

      {
        loading ? array.map((elm,index) => (
          <div key={index}>
          <div className='loader fixed w-full h-[2px] left-0 top-0 bg-red-600 z-[9999]' />
          <SkeletonTheme  highlightColor="#aaa" baseColor='#9b9b9b'>
            <div className=" xl:w-[23rem] lg-[21rem] md:w-[17rem] sm:w-[19rem] w-[90%] h-96 rounded-md flex flex-col gap-4">
              <Skeleton className='h-28' borderRadius="8px" />
              <div className="flex w-full h-28 justify-between">
                <div className="h-full flex pt-2 justify-start w-[19%]">
                  <Skeleton circle className='h-12 w-12' />
                </div>
                <div className="flex flex-col gap-2 w-[81%]">
                  <Skeleton className='h-8' />
                  <Skeleton className='h-8' />
                  <Skeleton className='h-8' />
                </div>
              </div>
            </div>
          </SkeletonTheme>
          </div>
        )):
          trendingVdos.map(({ videoId, title, channelTitle, publishedTimeText, viewCount, channelThumbnail, thumbnail, channelId }) => {

            if (channelThumbnail && thumbnail) {
              return <VideoCard key={videoId} thumb={thumbnail} link={videoId} description={title} channel_name={channelTitle} channel_logo={channelThumbnail} views={viewCount} time={publishedTimeText} channelId={channelId} />
            }

            return null;

          }
          )
      }
    </div>
    </>
  )

}

export default Trending
