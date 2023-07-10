import React, { useContext, useEffect, useState } from "react";
import Subscribecard from "../component/Subscribecard";
import { AuthContext } from "../AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Subscription = () => {
  const { currentUser } = useContext(AuthContext);
  const [subscribed, setSubscribed] = useState([]);

  useEffect(() => {
    const fetchId = async () => {
      if (currentUser && currentUser?.uid) {
        const docRef = doc(db, "users", currentUser.uid);
        const unsub = await onSnapshot(docRef, (doc) => {
          setSubscribed(doc.data().subscribedChannel);
        });
        return () => {
          unsub();
        };
      }
    };
    fetchId();
  }, [currentUser]);

  return (
    <>
      <h2 className="text white md:text-4xl text-3xl  font-semibold xl:pl-5 lg:pl-3 md:pl-8 pl-6">Subscribed Channels</h2>
      <div className="w-full pt-8 grid justify-items-center 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12">
        {subscribed?.map((elm , index) => (
          <Subscribecard key={index}
            channelId={elm?.id}
            channelName={elm?.name}
            channelSubscriber={elm?.subscriber}
            channelLogo={elm?.logo}
          />

        ))}
      </div>
    </>
  );
};

export default Subscription;
