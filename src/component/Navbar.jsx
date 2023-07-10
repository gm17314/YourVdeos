import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { AiFillCompass } from 'react-icons/ai'
import { AiFillLike } from 'react-icons/ai'
import { BsSunFill } from 'react-icons/bs'
import { MdNightlight } from 'react-icons/md'
import { RiShutDownLine } from 'react-icons/ri'
import { FaUserCheck } from 'react-icons/fa'
import { VscHistory } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import {auth} from "../firebaseConfig"
import { signOut } from 'firebase/auth'



const Navbar = ({open,setOpen}) => {

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'dark'
    )

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        theme === 'dark' ? setTheme('light'): setTheme('dark')
        setOpen(!open)
    }

    const handleLogout = async()=>{
        setOpen(!open)
        await signOut(auth);
    }

    return (
        <div className={`lg:pl-2 pl-1 bg-white text-black dark:bg-black dark:text-white sm:w-[12%] xl:w-[12%] 2xl:w-[10%] w-[50%] h-full  items-start  md:border-0 border-t-[1px] dark:border-[#212121] z-10 md:z-0 sm:static absolute left-[${open?"0%":"-100%"}] sm:transition-none transition-all duration-700 bg-black`}>
            
            <div className='flex flex-col xl:gap-[19px] lg:gap-8 md:gap-5 gap-7 py-4 md:pr-0 sm:pr-16'>
                <Link to='/' onClick={()=>setOpen(!open)} className='lg:w-[70%] w-[85%]  dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg flex flex-col 2xl:gap-2 lg:gap-1 justify-between items-center'>
                    <AiFillHome className='text-3xl' />
                    <h3>Home</h3>
                </Link>
                <Link to='/Trending' onClick={()=>setOpen(!open)} className='lg:w-[70%] w-[85%] dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg flex flex-col  xl:gap-2 lg:gap-1 justify-between items-center'>
                    <AiFillCompass className='text-3xl' />
                    <h3>Trending</h3>
                </Link>
                <Link to='/Subscribed' onClick={()=>setOpen(!open)} className='lg:w-[70%] w-[85%] dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg flex flex-col xl:gap-2 lg:gap-1 justify-between items-center'>
                    <FaUserCheck className='text-3xl' />
                    <h3>Subscribed</h3>
                </Link>
                <Link to='/Liked' onClick={()=>setOpen(!open)} className='lg:w-[70%] w-[85%] dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg flex flex-col xl:gap-2 lg:gap-1 justify-between items-center'>
                    <AiFillLike className='text-3xl' />
                    <h3>Liked</h3>
                </Link>
                <Link to='/History' onClick={()=>setOpen(!open)} className='lg:w-[70%] w-[85%] dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg flex flex-col xl:gap-2 lg:gap-1 justify-between items-center'>
                    <VscHistory className='text-3xl' />
                    <h3>History</h3>
                </Link>
                <button onClick={toggleTheme}  className='lg:w-[70%] w-[85%] dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg flex flex-col xl:gap-2 lg:gap-1 justify-between items-center'>
                    {theme==="dark"?<BsSunFill className='text-3xl' />:
                    <MdNightlight className='text-3xl' />}
                    <h3>{theme==="dark"?"Light":"Dark"}</h3>
                </button>
                <button onClick={handleLogout} className='lg:w-[70%] w-[85%] dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg flex flex-col xl:gap-2 lg:gap-1 justify-between items-center'>
                    <RiShutDownLine className='text-3xl' />
                    <h3>Logout</h3>
                </button>
            </div>
        </div>
    )
}

export default Navbar
