import React, { useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";




function App() {
  const [open, setOpen] = useState(false);

  // console.log("hello",currentUser,userData)
  return (
    <div className=" bg-white text-black dark:bg-black dark:text-white w-full h-[100vh]">
      <Header open = {open} setOpen = {setOpen} />
      <Main open = {open} setOpen = {setOpen}/>
    </div>
  );
}

export default App;
