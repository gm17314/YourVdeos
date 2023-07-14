import React, { useContext, useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import RelatedVideos from "../component/RelatedVideos";
import { Link, useParams } from "react-router-dom";
import { CountryCodeContext } from "../CountryCodeContext";
import { fetchFromAPI } from "../fetchApi";
import { db } from "../firebaseConfig";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { AuthContext } from "../AuthContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SubscribeButton from "../component/SubscribeButton";
import { toast } from "react-toastify";
import ShareModal from "../component/ShareModal";
// import { UserDataContext } from "../UserDataContext";

const Playpage = () => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState([]);
  const [comm, setComm] = useState(false);
  const { videoID } = useParams();
  const { countryCode } = useContext(CountryCodeContext);
  const [videoData, setVideoData] = useState();
  const [loading, setLoading] = useState(false);
  const [relatedVdos, setRelatedVdos] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [userLikedVdos, setUserLikedVdos] = useState([]);
  const resObj = { '144p': 0, '360p': 1, '720p': 2 };

  // const { userData } = useContext(UserDataContext)

  const createLinks = (text) => {
    if (text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.split(urlRegex).map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              className="text-blue-600"
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          );
        }
        // console.log("hello", part)
        return part;
      });
    }
  };

  const getDataFromApi = async () => {
    setLoading(true);
    const apiData = await fetchFromAPI(
      `related?id=${videoID}&geo=${countryCode}`
    );
    setVideoData(apiData.meta);
    setRelatedVdos(apiData.data);

    setLoading(false);
  };

  useEffect(() => {
    const getDataFromApi = async () => {
      const apiData = await fetchFromAPI(`comments?id=${videoID}`);
      setComment(apiData.data);
    };
    if (comment.length === 0) {
      getDataFromApi();
    }
    // console.log(comment);
  }, [comment, videoID]);

  useEffect(() => {
    getDataFromApi();

    // eslint-disable-next-line
  }, [videoID]);

  const handleComment = async () => {
    setComm(!comm);
    if (currentUser && currentUser.uid) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsub = await onSnapshot(docRef, (doc) => {
        // const newData = doc.data().likedVdos;
        // console.log("Updated userData:", newData);
      });

      return () => {
        unsub();
      };
    }
  };

  const handleLike = async (id) => {
    if (!currentUser) {
      toast.error("You're not logged in !!!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const arr = userData.likedVdos || [];
        if (arr.includes(id)) {
          const position = arr.indexOf(id);
          arr.splice(position, 1);
        } else {
          arr.push(id);
        }
        await updateDoc(docRef, {
          likedVdos: arr,
        });
        setUserLikedVdos(arr);
      }
    }
  };

  useEffect(() => {
    const handleHistory = async (id) => {
      if (currentUser && currentUser.uid) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const arr = userData.history || [];
          if (arr.includes(id)) {
            const position = arr.indexOf(id);
            arr.splice(position, 1);
          } else {
            arr.push(id);
          }
          await updateDoc(docRef, {
            history: arr,
          });
        }
      }
    };
    handleHistory(videoID);
    // eslint-disable-next-line
  }, [videoID]);




  const handleDownload = async (e) => {
    const res = e.target.value;
    if (res) {
      const apiData = await fetchFromAPI(`dl?id=${videoID}`);
      const { formats } = await apiData;
      const vdoUrl = formats[resObj[res]].url;

      window.open(vdoUrl)
    }
  };

  return (
    // const { title, channelThumbnail, channelId, channelTitle, subscriberCountText, likeCount, description, videoId } = videoData;
    <div className="flex flex-col lg:flex-row md:gap-0 gap-12">
      <div className=" p-2 flex flex-col gap-4 lg:w-[70%] ">
        {loading ? (
          <>
            <div className="loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]" />
            <SkeletonTheme highlightColor="#aaa" baseColor="#9b9b9b">
              <div className="2xl:h-[74vh] xl:h-[60vh] lg:h-[22rem] md:h-64 h-[14.5rem]">
                <Skeleton width="100%" height="100%" />
              </div>
            </SkeletonTheme>
          </>
        ) : (
          <div className=" 2xl:h-[74vh] xl:h-[70vh] lg:h-[22rem] md:h-96  h-[14.5rem]">
            <iframe
              width={"100%"}
              height={"100%"}
              src={`https://www.youtube.com/embed/${videoData?.videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <p className="xl:text-[20px] text-[18px] dot font-semibold">
          {videoData?.title}
        </p>

        <div className="flex gap-4 lg:gap-2 flex-col ">

          <div className="flex flex-row md:gap-0 gap-3 md:justify-normal justify-between items-center w-full">

            <div className="flex items-center md:gap-4 gap-2 md:w-[37%] w-[67%]">
              <div className="xl:w-[17%] md:w-[19%] w-[17%] ">
                <img
                  src={
                    videoData?.channelThumbnail[
                      videoData?.channelThumbnail.length - 1
                    ].url
                  }
                  alt=""
                  className="rounded-full "
                />
              </div>
              <div>
                <Link
                  to={`/Channel/${videoData?.channelId}`}
                  className="text-black dark:text-white xl:text-[16px] lg:text-[14px] md:text-[15px] text-[16px] font-medium"
                >
                  {videoData?.channelTitle}
                </Link>
                <br />
                <span className="text-black dark:text-white xl:text-[16px] lg:text-[14px] md:text-[15px] text-[15px] font-medium">
                  {videoData?.subscriberCountText}
                </span>
              </div>
            </div>
            <SubscribeButton
              channelId={videoData?.channelId}
              channelName={videoData?.channelTitle}
              channelLogo={
                videoData?.channelThumbnail[
                  videoData?.channelThumbnail.length - 1
                ].url
              }
              channelSubscriber={videoData?.subscriberCountText}
            />
          </div>

          <div className=" flex w-full justify-between">

            <div
              onClick={() => handleLike(videoID)}
              className=" md:gap-1 gap-2 flex justify-between items-center  dark:bg-[#272727]  bg-zinc-200/95 rounded-full text-black  xl:text-[17px] lg:text-[15.5px] md:text-[15px] text-[20px] font-medium py-[3px] md:px-2 px-3 cursor-pointer"
            >
              {userLikedVdos &&
                (userLikedVdos?.includes(videoID) ? (
                  <span className="text-zinc-800 dark:text-white font-medium xl:text-[15px] lg:text-[13px] md:text-[12px] text-[15px] px-2 py-0">Liked</span>
                ) : (
                  <div className="md:gap-1 gap-2 flex justify-between items-center  dark:bg-[#272727]  bg-zinc-200/95 rounded-full dark:text-white text-black  xl:text-[17px] lg:text-[15.5px] md:text-[15px] text-[20px] font-medium cursor-pointer">
                    <FiThumbsUp />
                    <span className="text-zinc-800 dark:text-white font-medium xl:text-[15px] lg:text-[13px] md:text-[12px] text-[14.6px]">
                      {parseInt(videoData?.likeCount).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>

            <ShareModal />
            <select onChange={(e) => handleDownload(e)} className=" bg-stone-200 hover:bg-zinc-300 dark:bg-[#272727] dark:text-white text-zinc-800 xl:text-[20px] lg:text-[19px] md:text-[18px] text-[20px] md:py-1 md:px-2 py-[3px] px-2 rounded text-lg outline-none -0 cursor-pointer">
              Sort By
              <option
                href="/"
                className="block px-4 py-2 dark:text-white text-gray-800 w-full "
                value=''>Download
              </option>
              <option
                href="/"
                className="block px-4 py-2 dark:text-white text-gray-800 w-full "
                value='144p'>144p
              </option>
              <option
                href="/"
                className="block px-4 py-2 dark:text-white text-gray-800 w-full "
                value='360p'>360p
              </option>
              <option
                href="/"
                className="block px-4 py-2 dark:text-white text-gray-800 w-full "
                value='720p'>720p
              </option>
            </select>
          </div>



        </div>

        <div className="flex flex-col gap-2">
          <div
            className={`${show ? "" : "description"
              } text-[1rem] h-55%  p-[10px] pb-[2px]  bg-gray-600/5 text-black dark:text-white dark:bg-[#272727] text-medium rounded-lg`}
          >
            <pre>{createLinks(videoData?.description)}</pre>
          </div>
          <div className="p-1">
            <button className="text-blue-500" onClick={() => setShow(!show)}>
              {show ? "show less" : "show more"}
            </button>
          </div>
          
          <div className="pt-10">
            <div className="flex justify-between lg:w-[40%] md:w-[50%] w-[70%]">
              <span>Comments</span>
              <button className="text-blue-500" onClick={handleComment}>
                {comm ? "Hide comments" : "Load comments"}
              </button>
            </div>
            <div
              className={`${comm ? "" : "hidden"
                } flex flex-col gap-8 text-[1rem] h-50%  pt-2  bg-gray-100/100 text-black text-medium rounded-lg dark:text-white dark:bg-[#272727]  p-2`}
            >
              {comment.map((com, key) => {
                if (com?.authorThumbnail)
                  return (
                    <div
                      key={key}
                      className="flex items-center w-[85%] m-2 mb-4 gap-3 lg:gap-4 relative break-words {                    "
                    >
                      {/* {console.log(com)} */}
                      <div className="w-[6%] h-full " />
                      <div className="md:w-[6%] w-[8%]  h-full absolute top-1 ">
                        <img
                          src={
                            com.authorThumbnail[com.authorThumbnail.length - 1]
                              .url
                          }
                          alt=""
                          className="rounded-full "
                        />
                      </div>
                      <div className="w-[90%] ">
                        <span
                          href="/"
                          className="xl:text-[16px] lg:text-[14px] md:text-[15px] text-[16px] font-semibold text-gray-600 dark:text-white"
                        >
                          {com?.authorText}
                        </span>{" "}
                        &nbsp; &nbsp; <span>{com?.publishedTimeText}</span>{" "}
                        <br />
                        <p className="text-black xl:text-[16px] lg:text-[14px] md:text-[15px] text-[15px] font-medium dark:text-white">
                          {com?.textDisplay}
                        </p>
                        <div className="flex gap-2">
                          <FiThumbsUp className="dark:text-white text-black xl:text-[21px] lg:text-[20px] md:text-[15px] text-[18px] font-medium " />
                          {com?.likesCount}
                        </div>
                      </div>
                    </div>
                  );
                else return null;
              })}
            </div>
          </div>
        </div>
      </div>
      <RelatedVideos loading={loading} relatedVdos={relatedVdos} />
    </div>
  );
};

export default Playpage;
