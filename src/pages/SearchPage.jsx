import React, { useContext} from 'react'
import SearchCard from '../component/Searchcard'
import { useParams } from 'react-router-dom';
import { CountryCodeContext } from '../CountryCodeContext';
import { fetchFromAPI } from '../fetchApi';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useQuery } from "react-query"

const SearchPage = () => {

  const { searchValue } = useParams();
  const countryCode = useContext(CountryCodeContext);
  const array = Array(12).fill(0);

  const { isLoading, data } = useQuery(searchValue, async() => {
    const {data} = await fetchFromAPI(`search?query=${searchValue}&geo=${countryCode.countryCode}`);
    return data
  }, { cacheTime: 1800000, staleTime: 1800000 });
  



  return (
    <div className='w-full flex flex-col items-center gap-10 pt-8'>
      {
        isLoading ? array.map((elm, index) => (
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
        )) :
          data?.map((data,index) => {

            // console.log(data)
            if (data?.thumbnail && data?.description && data?.viewCount) {
              return <SearchCard key={index} thumb={data?.thumbnail[data?.thumbnail.length - 1].url} link={data?.dataId} description={data?.description} channelId={data?.channelId} channel_name={data?.channelTitle} views={data?.viewCount} time={data?.publishedTimeText} title={data?.title} />
            }

            return null;

          }
          )
      }
    </div>
  )
}

export default SearchPage
