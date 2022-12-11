import {React, useState} from 'react';
import close from '../styles/images/close.png'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {BsChatDotsFill, BsFillMapFill, BsMapFill} from 'react-icons/bs'
import {RiLogoutBoxFill} from 'react-icons/ri'
import { FaHome, FaShoppingBag, FaBars, FaUserAlt, FaUserCheck, FaUserPlus} from 'react-icons/fa'


{/*https://www.youtube.com/watch?v=eujA1RS9fDI*/}

function Sidebar () {
    const navigate= useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const user = localStorage.getItem('loggedInas')
    

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='m-0 p-0 box-border fixed left-0 top-0'>
        <motion.div animate={{width: isOpen ? "200px" : "45px" }} className='bg-[#302c2c] text-slate-300 h-[100vh] no-underline rounded-r-md shadow-2xl'>

        <div className='flex items-center justify-between p-[15px]'>
            {isOpen && <h1 className='text-[18px] pr-[15px] leading-none'>
                <a href="/">A R I G M A</a>
                </h1>}
                <div className=''>
                    <FaBars onClick={toggle} />
                </div>
        </div>

            { isOpen && <section className="routes text-[15px] text-slate-300 space-y-16 mt-[5vh]">
                <NavLink to='/home' key={'home'} className='flex gap-5 pl-[10px] items-center hover:border-r-4'>
                <div><FaHome /></div>
                    <div>Home</div>
                </NavLink>
                <NavLink to={`/profile/${user}`} key={'profile'} className='flex pl-[10px] gap-5 items-center hover:border-r-4'>
                    <div><FaUserAlt /></div>
                    <div>Profile</div> 
                </NavLink>

                {user ? <NavLink onClick={() => localStorage.removeItem('loggedInas')} to='/login' key={'login'} className='flex pl-[10px] gap-5 items-center hover:border-r-4'>
                    <div><RiLogoutBoxFill /></div>
                    <div>Logout</div> 
                </NavLink> : <NavLink to='/login' key={'login'} className='flex pl-[10px] gap-5 items-center hover:border-r-4'>
                    <div><FaUserCheck /></div>
                    <div>Login</div> 
                </NavLink>}
                <NavLink to='/register' key={'register'} className='flex pl-[10px] gap-5 items-center hover:border-r-4'>
                    <div><FaUserPlus /></div>
                    <div>Register</div> 
                </NavLink>
                <NavLink to='/chat' key={'chat'} className='flex pl-[10px] gap-5 items-center hover:border-r-4'>
                    <div><BsChatDotsFill /></div>
                    <div>Chat</div> 
                </NavLink>
                
               
            </section> }
        </motion.div>
        </div>

    );
}

export default Sidebar;