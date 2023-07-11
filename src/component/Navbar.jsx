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
import { auth } from "../firebaseConfig"
import { signOut } from 'firebase/auth'



const Navbar = ({ open, setOpen }) => {

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'dark'
    )

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        theme === 'dark' ? setTheme('light') : setTheme('dark')
        setOpen(!open)
    }

    const handleLogout = async () => {
        setOpen(!open)
        await signOut(auth);
    }

    return (
        <div className={`flex md:justify-center pl-2 bg-white text-black dark:bg-black dark:text-white sm:w-[12%] md:w-[13%] xl:w-[9%] lg:w-[10%] w-[50%] h-full  items-start  md:border-0 border-t-[1px]  dark:border-[#212121] z-10 md:z-0 sm:static absolute left-[${open ? "0%" : "-100%"}] sm:transition-none transition-all duration-700 bg-black overflow-y-auto scrollbar-hide whitespace-nowrap`}>

            <div className='flex flex-col xl:gap-3 lg:gap-8 md:gap-5 gap-7 py-4 md:pr-0 sm:pr-16 '>
                <Link to='/' onClick={() => setOpen(!open)} className=' md:w-[60%] w-full  lg:py-1  dark:hover:bg-slate-500 hover:bg-slate-300 rounded-lg flex md:flex-col  lg:gap-1 gap-2 md:justify-between items-center'>
                    <AiFillHome className='text-[20px]' />
                    <h3 className='text-sm'>Home</h3>
                </Link>
                <Link to='/Trending' onClick={() => setOpen(!open)} className=' md:w-[60%] w-full lg:py-1  dark:hover:bg-slate-500 hover:bg-slate-300 rounded-lg flex md:flex-col    lg:gap-1 gap-2 md:justify-between items-center'>
                    <AiFillCompass className='text-[20px]' />
                    <h3 className='text-sm'>Trending</h3>
                </Link>
                <Link to='/Subscribed' onClick={() => setOpen(!open)} className=' md:w-[60%] w-full lg:py-1  dark:hover:bg-slate-500 hover:bg-slate-300 rounded-lg flex md:flex-col   lg:gap-1 gap-2 md:justify-between items-center'>
                    <FaUserCheck className='text-[20px]' />
                    <h3 className='text-sm'>Subscribed</h3>
                </Link>
                <Link to='/Liked' onClick={() => setOpen(!open)} className=' md:w-[60%] w-full lg:py-1  dark:hover:bg-slate-500 hover:bg-slate-300 rounded-lg flex md:flex-col   lg:gap-1 gap-2 md:justify-between items-center'>
                    <AiFillLike className='text-[20px]' />
                    <h3 className='text-sm'>Liked</h3>
                </Link>
                <Link to='/History' onClick={() => setOpen(!open)} className=' md:w-[60%] w-full lg:py-1  dark:hover:bg-slate-500 hover:bg-slate-300 rounded-lg flex md:flex-col   lg:gap-1 gap-2 md:justify-between items-center'>
                    <VscHistory className='text-[20px]' />
                    <h3 className='text-sm'>History</h3>
                </Link>
                <button onClick={toggleTheme} className=' md:w-[60%] w-full lg:py-1  dark:hover:bg-slate-500 hover:bg-slate-300 rounded-lg flex md:flex-col   lg:gap-1 gap-2 md:justify-between items-center'>
                    {theme === "dark" ? <BsSunFill className='text-[20px]' /> :
                        <MdNightlight className='text-[20px]' />}
                    <h3 className='text-sm'>{theme === "dark" ? "Light" : "Dark"}</h3>
                </button>
                <button onClick={handleLogout} className=' md:w-[60%] w-full lg:py-1  dark:hover:bg-slate-500 hover:bg-slate-300 rounded-lg flex md:flex-col   lg:gap-1 gap-2 md:justify-between items-center'>
                    <RiShutDownLine className='text-[20px]' />
                    <h3 className='text-sm'>Logout</h3>
                </button>
            </div>
        </div>
    )
}

export default Navbar
