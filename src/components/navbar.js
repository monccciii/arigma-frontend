import {React, useEffect, useState} from 'react';
import dropdownicon from '../styles/images/dropdown.png'
import Sidebar from './sidebar';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Acccomp from './acccomp';

const Navbar = (props) => {
const navigate = useNavigate()



    return (
        <div style={{fontFamily:"'Poppins', sans-serif"}} className='sticky flex bg-[#292929] top-0 z-10 p-5 shadow'>
            <div className='justify-start object-center align-middle'>
                <Sidebar />
                <Acccomp />
            </div>
            <p className="text-slate-300 text-xl text-center w-full"><span onClick={() => navigate('/')} >A R I G M A</span></p>
            
        </div>
    )
}

export default Navbar;