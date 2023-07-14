import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { AuthContext } from "../AuthContext";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { AiOutlineClear } from "react-icons/ai";
import VideoCard from "../component/VideoCard";
import { fetchFromAPI } from "../fetchApi";
import SortBy from "../component/SortBy";
import { RiDeleteBin6Line } from "react-icons/ri";

const History = () => {
  const [loading, setLoading] = useState(false);
  const array = Array(12).fill(0);
  const { currentUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchId = async () => {
      if (currentUser && currentUser?.uid) {
        const docRef = doc(db, "users", currentUser.uid);
        const unsub = await onSnapshot(docRef, (doc) => {
          setHistory(doc.data().history);
        });
        return () => {
          unsub();
        };
      }
    };
    fetchId();
  }, [currentUser]);

  useEffect(() => {
    const getVideos = async () => {
      if (history.length >= 1) {
        const videoIds = history.join(",");
        setLoading(true);
        const apiData = await fetchFromAPI(`video/info?id=${videoIds}`);
        setLoading(false);
        if (history && history.length === 1) {
          setVideos([apiData]);
        } else {
          setVideos(apiData.data);
        }
      }
    };

    getVideos();
  }, [history]);

  const clearHistory = async (id) => {
    if (currentUser && currentUser.uid) {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        history:[],
      });
      setVideos([]);
    }
  };

  const handleSingleDelete = async (id) => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const arr = userData?.history;
      const index = arr.indexOf(id);
      arr.splice(index, 1);
      await updateDoc(docRef, {
        history:arr,
      });
    }
  };
  return (
    <div className="flex flex-col gap-2 ">
      <h2 className="flex justify-between items-center text white pr-[2%] md:text-4xl text-3xl  font-semibold xl:pl-5 lg:pl-3 md:pl-8 pl-6">
        <span>Watch History</span>

        <div
          onClick={clearHistory}
          className="flex rounded-3xl md:text-3xl text-2xl font-medium items-center gap-1 px-2 py-1 dark:text-zinc-800 dark:bg-white dark:hover:bg-slate-300 text-white bg-zinc-800 hover:bg-zinc-500 cursor-pointer"
        >
          <span>Clear</span> <AiOutlineClear title="clear history" />
        </div>
      </h2>
      <SortBy video={videos} set_video={setVideos} />

      <div className="w-full pt-8 grid justify-items-center 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        {loading
          ? array.map((elm, index) => (
              <div key={index} className="items-center w-full h-96 flex flex-col">
                <div className="loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]" />
                <SkeletonTheme highlightColor="#aaa" baseColor="#9b9b9b">
                  <div className=" xl:w-[23rem] lg-[21rem] md:w-[17rem] sm:w-[19rem] w-[90%] h-96 rounded-md flex flex-col gap-4">
                    <Skeleton className="h-28" borderRadius="8px" />
                    <div className="flex w-full h-28 justify-between">
                      <div className="h-full flex pt-2 justify-start w-[19%]">
                        <Skeleton circle className="h-12 w-12" />
                      </div>
                      <div className="flex flex-col gap-2 w-[81%]">
                        <Skeleton className="h-8" />
                        <Skeleton className="h-8" />
                        <Skeleton className="h-8" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </div>
            ))
       :videos?.map(
              ({
                id,
                title,
                channelTitle,
                publishedDate,
                viewCount,
                thumbnail,
                channelId,
              }) => {
                // console.log(thumbnail)
                if (thumbnail) {
                  return (
                    <div key={id} className="relative flex justify-center">
                      <button
                        onClick={() => handleSingleDelete(id)}
                        className="md:text-3xl text-2xl font-medium items-center gap-1 px-2 py-1 text-zinc-800 dark:text-white cursor-pointer absolute right-2 bottom-16 "
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <VideoCard
                        thumb={thumbnail}
                        link={id}
                        description={title}
                        channel_name={channelTitle}
                        channel_logo={null}
                        views={viewCount}
                        time={publishedDate}
                        channelId={channelId}
                      />
                    </div>
                  );
                }
                return null;
              }
            )}
      </div>
    </div>
  );
};

export default History;
