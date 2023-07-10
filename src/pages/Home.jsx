import React, { useContext, useEffect, useState } from 'react'
import Filter from '../component/Filter'
import { fetchFromAPI } from '../fetchApi';
import { CountryCodeContext } from '../CountryCodeContext';
import VideoCard from '../component/VideoCard'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Home = () => {

  const [videos, setVideos] = useState([]);
  const array = Array(12).fill(0)
  const [category, setCategory] = useState(null);
  const { countryCode } = useContext(CountryCodeContext);
  const [loading, setLoading] = useState(false);

  const getDataFromApi = async () => {

    setLoading(true);
    if (category) {
      const c = category[0].toLowerCase() + category.slice(1, category.length)
      const apiData = await fetchFromAPI(`hashtag?tag=${c}&geo=${countryCode}`)
      console.log(apiData.data)
      setVideos(apiData.data)
    }

    else {
      const apiData = await fetchFromAPI(`home?geo=${countryCode}`)
      setVideos(apiData.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDataFromApi();

    // eslint-disable-next-line
  }, [category])

  return (
    <>
      <Filter category={category} setCategory={setCategory} />
      <div className='w-full pt-8 grid justify-items-center 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
        {
          loading ? array.map((elm,index) => (
            <div key={index}>
            <div className='loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]' />
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
            videos.map(({ videoId, title, channelTitle, publishedTimeText, viewCount, channelThumbnail, thumbnail,  channelId }) => {

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

export default Home
