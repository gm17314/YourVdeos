import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BiSolidBellRing } from "react-icons/bi";
import { toast } from "react-toastify";


const SubscribeButton = ({
  channelId,
  channelName,
  channelLogo,
  channelSubscriber,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [subscribedChannel, setSubscribedChannel] = useState([]);

  const handleClick = async (
    channelId,
    channelLogo,
    channelName,
    channelSubscriber
  ) => {
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
        const arr = userData.subscribedChannel || [];
        const obj = {
          id: channelId,
          name: channelName,
          logo: channelLogo,
          subscriber: channelSubscriber,
        };

        // console.log(arr);

        const index = arr.findIndex((item) => item.id === obj.id);

        if (index !== -1) {
          arr.splice(index, 1);
        } else {
          arr.push(obj);
        }
        await updateDoc(docRef, {
          subscribedChannel: arr,
        });
        // console.log(arr);
      }
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsub = onSnapshot(docRef, (doc) => {
        const newData = doc.data().subscribedChannel;
        setSubscribedChannel(newData);
      });

      return () => {
        unsub();
      };
    }
  }, [currentUser]);

  return (
    <button
      onClick={() =>
        handleClick(channelId, channelLogo, channelName, channelSubscriber)
      }
      className="rounded-full dark:text-black dark:bg-white dark:hover:bg-slate-300 text-white bg-zinc-800 hover:bg-zinc-500  md:px-3 md:py-[6px] py-1 px-2 lg:m-0 md:ml-2  xl:text-[16px] lg:text-[14px] md:text-[15px] text-[16px] font-medium flex items-center gap-2"
    >
      {subscribedChannel &&
      subscribedChannel?.some((obj) => obj.id === channelId)
        ? "Subscribed "
       : "Subscribe"}
      {subscribedChannel &&
        subscribedChannel?.some((obj) => obj.id === channelId) && (
          <BiSolidBellRing />
        )}
    </button>
  );
};

export default SubscribeButton;
