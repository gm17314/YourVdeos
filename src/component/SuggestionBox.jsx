import React from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from 'react-icons/bi';


const SuggestionBox = ({ data, set_search, is_focus, set_focus, set_hover }) => {

  return (
    <div className={`${is_focus ? "flex":"hidden"} flex-col gap-1 bg-[#ffffff] dark:bg-zinc-800 sm:w-[90%] w-[44vh] rounded-md absolute top-12 md:left-0 left-[-30%] z-10 `}>

      {data?.map((elm, index) => (
        <div key={index} className="flex ml-3 items-center gap-2">
          <BiSearchAlt2 className="text-black dark:text-white text-[18px] font-medium" />

          <Link
            to={`search/${elm[0]}`}
            key={index}
            onClick={() =>
              set_focus(false)
            }
            onMouseOver={() => { set_search(elm[0]); set_hover(true) }}
            onMouseLeave={() => set_hover(false)}
            className="text-black dark:text-white text-[18px] font-medium"
          >
            {elm[0]}

          </Link>

        </div>
      ))}
    </div>
  );
};

export default SuggestionBox;
