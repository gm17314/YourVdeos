import React, { useState, useEffect, useContext } from 'react'
import VideoCard from '../component/VideoCard'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AuthContext } from '../AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { fetchFromAPI } from '../fetchApi';

const Liked = () => {
  const [loading, setLoading] = useState(false);
  const array = Array(12).fill(0)
  const { currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchId = async () => {
      if (currentUser && currentUser?.uid) {
        const docRef = doc(db, "users", currentUser.uid)
        const unsub = await onSnapshot(docRef, (doc) => {
          setLiked(doc.data().likedVdos);

        });
        return () => {
          unsub();
        };
      }
    }
    fetchId();
  }, [currentUser])
  
  useEffect(() => {
    const getVideos = async () => {
      if (liked.length >= 1) {
        const videoIds = liked.join(",");
        setLoading(true)
        const apiData = await fetchFromAPI(`video/info?id=${videoIds}`);
        setLoading(false)
        if (liked && liked.length === 1) {
          setVideos([apiData]);
        } else {
          setVideos(apiData.data);
        }
      }
    }
  
    getVideos();
  }, [liked])


  return (
    <>
    <h2 className="text white md:text-4xl text-3xl  font-semibold xl:pl-5 lg:pl-3 md:pl-8 pl-6">Liked Videos </h2>
    <div className='w-full pt-8 grid justify-items-center 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 '>
      {
        loading ? array.map((elm, index) => (
          <>
          <div className='loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]' />
          <SkeletonTheme key={index} highlightColor="#aaa" baseColor='#9b9b9b'>
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
          </SkeletonTheme></>
        )):
          videos?.map(({ id, title, channelTitle, publishedDate, viewCount, thumbnail, channelId }) => {
            console.log(thumbnail)
            if (thumbnail) {
              return <VideoCard key={id} thumb={thumbnail} link={id} description={title} channel_name={channelTitle} channel_logo={null} views={viewCount} time={publishedDate} channelId={channelId} />

            }
            return null;

          }
          )
      }
    </div>
    </>
  )
}

export default Liked
