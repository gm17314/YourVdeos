import React, { useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className=" bg-white text-black dark:bg-black dark:text-white w-full h-[100vh]">
      <ReactQueryDevtools />
      <Header open = {open} setOpen = {setOpen} />
      <Main open = {open} setOpen = {setOpen}/>
    </div>
  );
}

export default App;
