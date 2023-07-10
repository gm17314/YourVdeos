import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";


// creating context
export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {

  // creating an empty list for storing user data
  const [userData, setUserData] = useState([]);
  const currentUser = useContext(AuthContext);

  // fetching data of current user from firebase database
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsub = onSnapshot(docRef, (doc) => {
        // console.log(doc.data());
        setUserData(doc.data());
      });

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};
