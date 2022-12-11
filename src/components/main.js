import {React, useRef, useState} from 'react';
import Navbar from './navbar';
import group1 from '../styles/images/group1.png';
import group2 from '../styles/images/group2.png';
import group3 from '../styles/images/group3.png';
import { motion } from "framer-motion";
import pointer from "../styles/images/downarrow.png"
import { useNavigate } from "react-router-dom";
import '../index.css';
import capture1 from '../styles/images/capture1.PNG'
import capture2 from '../styles/images/Capture2.PNG'
import capture3 from '../styles/images/capture3.PNG'
import capture4 from '../styles/images/capture4.PNG';

const Main = () => {
    const [toggleOn, setToggleOn] = useState(false);
    const navigate = useNavigate();

    function getStarted() {
        navigate('/register')
    }

    return (
        <div className='overflow-x-hidden bg-[#292929]'>
             <Navbar />
            <div style={{height:'250vh', fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='bg-[#292929] whitespace-nowrap'>
            <div className='bg-black h-[50vh] ml-[2vw] sm:ml-[10vw] p-10 sm:float-left'>
            <p className='ml-[2vw] sm:ml-0 text-white text-center mt-[20%] text-base sm:text-xl md:text-2xl lg:text-3xl'>Welcome to</p>
            <p className='ml-[2vw] sm:ml-0 text-white text-center text-7xl sm:text-7xl text-5xl md:text-8xl lg:text-9xl'>A R I G M A</p>
            </div>
            <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1}}>
            <p style={{fontWeight:'200'}} className='text-slate-300 text-center text-xl mt-[20vh]'>Discuss Art.</p>
            </motion.div>
            <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2}}>
            <p style={{fontWeight:'200'}} className='text-slate-300 text-center mt-[5vh] text-2xl'>Share art.</p>
            </motion.div>
            <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5}}>
            <img height={200} width={200} className='mt-[6vh] mx-auto' src={pointer}></img>
            </motion.div>
  
            <div className='mt-[50vh] text-center'>
                <div className='container mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-10'>
                <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1}}>

<div className='h-auto text-white border-2'>
                        <p><img className='ml-[2vw] sm:ml-0' src={capture1}></img></p>
                    </div>
        </motion.div>

        <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1}}>
                    <div className='h-auto text-slate-300 border-2'>
                    <p><img className='ml-[2vw] sm:ml-0'src={capture2}></img></p>
                    </div>
                    </motion.div>

                    <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1}}>
                    <div className='h-auto text-white border-2'>
                    <p><img className='ml-[2vw] sm:ml-0'src={capture4}></img></p>
                    </div>
                    </motion.div>
                </div>
                </div>
                <p style={{fontWeight:'200'}} className='text-center text-2xl text-slate-300 sm:text-5xl mt-[50vh] ml-[2.5vw] sm:ml-0 '>Share, discover, and discuss art.</p>
                <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1}}>
                <p style={{fontWeight:'200'}} className='text-center text-3xl text-slate-300 sm:text-5xl mt-[25vh]'>Join&nbsp;&nbsp;<span style={{fontFamily:"'Poppins', sans-serif", fontWeight:'300'}}>A R I G M A</span>&nbsp;&nbsp;now!</p>
                </motion.div>
                <div>
                <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3}}>
                    <button onClick={getStarted} style={{fontWeight:'200'}} className='mt-[10vh] bg-green-500 text-2xl text-white rounded-full border-2 border-black p-8'>Get Started!</button>
                    </motion.div>
                </div>
            </div>
            </div>
            <div className='bg-black mt-[20vh] h-[10vh]'>
                <p className='text-center text-slate-300 pt-8'>A R I G M A</p>
            </div>
        </div>
    )
}

export default Main;