import React, { useContext, useEffect, useState } from 'react'
import SearchCard from '../component/Searchcard'
import { useParams } from 'react-router-dom';
import { CountryCodeContext } from '../CountryCodeContext';
import { SearchDataContext } from '../SearchDataContext';
import { fetchFromAPI } from '../fetchApi';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SearchPage = () => {

  const { searchValue } = useParams();
  const countryCode = useContext(CountryCodeContext);
  const { searchData, updateSearchData } = useContext(SearchDataContext);
  const [loading, setLoading] = useState(false);
  const array = Array(12).fill(0);
  const [videos, setVideos] = useState([]);

  const getDataFromApi = async () => {
    setLoading(true);

    // first check that search query is present in our context or not
    const cachedData = searchData[searchValue];

    // if yes then no need to fetch again
    if (cachedData) {
      setVideos(cachedData);
      setLoading(false);
    }

    // else fetch new data
    else {
      console.log(countryCode)
      const apiData = await fetchFromAPI(`search?query=${searchValue}&geo=${countryCode.countryCode}`);
      setVideos(apiData.data);
      setLoading(false);
      updateSearchData(searchValue, apiData.data);
    }
  };

  useEffect(() => {
    getDataFromApi();

    // eslint-disable-next-line
  }, [searchValue, countryCode]);
  // console.log(videos)
  return (
    <div className='w-full flex flex-col items-center gap-10 pt-8'>
      {
        loading ? array.map((elm,index) => (
          <div key={index} className="w-[90%] lg:h-56 md:h-48 rounded-md flex md:flex-row flex-col lg:gap-8 md:gap-3 gap-4 items-center">
            <>
              <div className='loader fixed w-full h-1 left-0 top-0 bg-red-600 z-[9999]' />
              <SkeletonTheme highlightColor="#aaa" baseColor='#9b9b9b'>
                <a href="/" className="md:h-full h-[50%] lg:w-[30%] md:w-[35%] w-full">
                  <Skeleton height="100%" width="100%" />
                </a>
                <div className="flex flex-col md:w-[65%] w-full lg:h-52 md:h-full lg:gap-3 md:gap-2">
                  <Skeleton height={25} width="80%" />
                  <Skeleton height={15} width="60%" />
                  <Skeleton height={15} width="70%" />
                  <Skeleton height={15} width="50%" />
                  <Skeleton height={15} width="70%" />
                </div>
              </SkeletonTheme>
            </>
          </div>
        )):
          videos?.map((video) => {

            // console.log(video)
            if (video?.thumbnail && video?.description && video?.viewCount) {
              return <SearchCard key={video?.videoId} thumb={video?.thumbnail[video?.thumbnail.length - 1].url} link={video?.videoId} description={video?.description} channelId={video?.channelId} channel_name={video?.channelTitle} views={video?.viewCount} time={video?.publishedTimeText} title={video?.title} />
            }

            return null;

          }
          )
      }
    </div>
  )
}

export default SearchPage
