import React, { useState } from "react";

const SortBy = ({ video, set_video }) => {
  const [prev, setPrev] = useState("Oldest");

  const handleSort = (e) => {

    if ( prev !== e.target.value ){
        const arr = [...video].reverse()
        set_video(arr)
        setPrev(e.target.value)
    }
  };

  return (
    <div  className="xl:pl-5 lg:pl-3 md:pl-8 pl-6">

    <select onChange={(e)=>handleSort(e)}

      className="bg-stone-200 hover:bg-zinc-300 text-zinc-800 xl:text-[20px] lg:text-[19px] md:text-[18px] text-[20px] md:py-1 md:px-2 py-[3px] px-2 rounded text-lg outline-none border-0 cursor-pointer"
    >
      Sort By
      <option
        href="/"
        className="block px-4 py-2 text-gray-800 w-full "
      >
        Oldest
      </option>
      <option
        href="/"
        className="block px-4 py-2 text-gray-800 w-full "
      >
        Newest
      </option>
      {/* <option
        href="/"
        className="block px-4 py-2 text-gray-800 w-full cursor-pointer"
      >
        A - Z
      </option> */}
    </select>
    </div>
  );
};

export default SortBy;
