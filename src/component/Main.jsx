import React, { useContext } from 'react'
import {AuthContext} from "../AuthContext"
import Navbar from './Navbar'
import Playpage from '../pages/Playpage'
import Trending from '../pages/Trending'
import SearchPage from '../pages/SearchPage'
import Channel from '../pages/Channel'
import Home from '../pages/Home'
import Liked from '../pages/Liked'
import { Navigate, Route, Routes } from 'react-router-dom'
import Subscription from '../pages/Subscription'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from '../pages/History'

const Main = ({open,setOpen}) => {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <div className='h-[calc(90vh)] flex sm:static relative'>
      <Navbar open = {open} setOpen = {setOpen}/>
      <div className='sm:w-[94.5%] w-full h-full overflow-auto z-0 '>
     
      <Routes>
        <Route path='/Trending' element={<Trending />}/>
        <Route path='/Play/:videoID' element={<Playpage />}/>
        <Route path='/Channel/:channelID' element={<Channel />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/Subscribed' element={<ProtectedRoute><Subscription /></ProtectedRoute>}/>
        <Route path="/search/:searchValue" element={<SearchPage />} />
        <Route path='/Liked' element={<ProtectedRoute><Liked /></ProtectedRoute>}/>
        <Route path='/History' element={<ProtectedRoute><History /></ProtectedRoute>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"
      />
      
      </div>
    </div>
  )
}





export default Main
