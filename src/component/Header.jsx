import React, { useContext, useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import logo from "../logo.png";
import { BsSearch } from "react-icons/bs";
import { BiVideoPlus } from "react-icons/bi";
import { BsBell, BsMicFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { signInWithPopup } from "firebase/auth";
import { auth, db, gProvider } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import SuggestionBox from "./SuggestionBox";

const Header = ({ setOpen, open }) => {
  // eslint-disable-next-line
  const [search, setSearch] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const [suggestedData, setSuggestedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim() !== "") {
      const searchText = e.target[0].value;
      navigate(`/search/${searchText}`);
      setSearch(!search);
      e.target[0].value = "";
    } else setSearch(true);
  };

  useEffect(() => {
    // Define the callback function in the global scope
    window.handleSuggestionCallback = (data) => {
      setSuggestedData(data[1]);
    };

  }, [searchValue]);

  const handleSuggestion = (query) => {
    setSearchValue(query);
    const script = document.createElement("script");
    script.src = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${query}&callback=handleSuggestionCallback`;
    document.body.appendChild(script);
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, gProvider);
      const user = res.user;
      // console.log(user)
      const { uid, displayName, photoURL, email } = user;

      const docRef = doc(db, "users", uid);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        await setDoc(docRef, {
          uid,
          displayName,
          photoURL,
          email,
          likedVdos: [],
          subscribedChannel: [],
          history: [],
        });
      } else console.log("doc already exists");
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    const handleSearchValue = () => {
      setSearchValue(transcript);
    }

    handleSearchValue();

    // eslint-disable-next-line
  }, [transcript])


  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center  md:px-4 px-1 h-[10vh]">
      <div
        className="text-4xl w-[6%] cursor-pointer sm:hidden inline-block transition-all duration-1000"
        onClick={() => setOpen(!open)}
      >
        {open ? <RxCross1 />: <AiOutlineMenu />}
      </div>

      <div className=" logo flex justify-center items-center xl:w-[15%] lg:w-[17%] md:w-[25%] w-[15%]">
        <img src={logo} alt="" className="md:w-13 w-14 h-full sm:m-0 ml-6" />
        <h2 className="md:text-[28px] text-[30px] font-semibold md:inline-block hidden">
          YourVdeos
        </h2>
      </div>

      <form
        onSubmit={handleSearch}
        id="searchbar"
        className={` dark:bg-black xl:w-[45%] md:w-[50%] sm:w-[50%] w-[70%] xl:h-11 h-10 sm:m-0 ml-4 rounded-full flex md:justify-between justify-center items-center relative ${!search ? "overflow-hidden": ""} `}
      >

        <input
          type="text"
          placeholder={listening ? 'Listening...': 'Search'}
          onChange={(e) => { handleSuggestion(e.target.value); setSearch(true) }}
          value={searchValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            if (!isHover) setIsFocus(false);
          }}
          className={` sm:transition-none ${search ? "": "transition-all duration-1000"}  font-medium outline-none border-0 text-black dark:bg-zinc-800 dark:text-white sm:w-[85%] w-[75%] h-full sm:rounded-l-full md:rounded-r-none rounded-full p-2 pl-4 text-[1.3rem] z-0 sm:static absolute  ${search ? "left-[0%]": "left-[-100%]"}`}
          
        />
        <SuggestionBox
          data={suggestedData && suggestedData}
          set_search={setSearchValue}
          is_focus={isFocus}
          set_focus={setIsFocus}
          set_hover={setIsHover}
        />
        <button className="text-2xl cursor-pointer sm:w-[10%] w-[15%] h-full text-black bg-zinc-200 dark:bg-zinc-600 dark:text-white md:rounded-l-none sm:rounded-r-full rounded-full flex justify-center items-center absolute sm:static right-7">
          <BsSearch />
        </button>

        <button className="text-2xl cursor-pointer md:pl-4 p-2 w-[7%] absolute sm:static right-3">
          {
            listening ? < RxCross1 onClick={SpeechRecognition.stopListening} />: <BsMicFill onClick={SpeechRecognition.startListening} />}

        </button>

      </form>

      <div
        id="right-nav"
        className="xl:w-[11%] lg:w-[13%] md:w-[10%] sm:w-[13%] text-2xl flex items-center justify-between sm:p-0 pt-1"
      >
        <span className="lg:inline-block hidden">
          <BsBell />
        </span>
        <span className="lg:inline-block hidden">
          <BiVideoPlus />
        </span>
        <div className="cursor-pointer " onClick={handleGoogleSignIn}>
          <img
            src={
              currentUser
                ? currentUser.photoURL
               : "https://firebasestorage.googleapis.com/v0/b/infinity-blogs.appspot.com/o/blogsImages%2Fldfklkfd1687695154408?alt=media&token=f6fecf9e-b5d4-41a4-b986-401bba45b519"
            }
            alt=" "
            title={currentUser ? currentUser.displayName: ""}
            onError={(e) => {
              e.target.src =
                "https://firebasestorage.googleapis.com/v0/b/infinity-blogs.appspot.com/o/blogsImages%2Fldfklkfd1687695154408?alt=media&token=f6fecf9e-b5d4-41a4-b986-401bba45b519";
            }}
            className="rounded-full md:m-0 ml-2 md:h-10 h-8 md:w-10 w-8"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
