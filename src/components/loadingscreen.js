import {React, useEffect, useState} from 'react';
import Navbar from './navbar';

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { ProgressBar } from 'react-loader-spinner';
const Loading = (props) => {
    const navigate = useNavigate();
    
    const howlong = props.time
  

    return (
        <div>
            <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
            repeat: 1,
            repeatDelay: `${howlong}`,
            repeatType: "reverse",
            duration: 1}}>
            <div style={{fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='flex fixed bg-black whitespace-nowrap h-screen w-screen z-50'>
            <div className='m-auto'>
            <p className='text-center text-5xl text-slate-400'>A R I G M A</p>
            <ProgressBar
  height="80"
  width="500"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = 'black'
  barColor = 'white'
/>
</div>
            </div>
            </motion.div>
        </div>
    )
}

export default Loading;