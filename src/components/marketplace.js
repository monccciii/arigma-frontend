import {React, useEffect, useState} from 'react';
import Navbar from './navbar';

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const Marketplace = () => {
    const navigate = useNavigate();
    

  

    return (
        <div>
             <Navbar />
            <div style={{height:'250vh', fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='bg-white whitespace-nowrap'>
               
            </div>
        </div>
    )
}

export default Marketplace;