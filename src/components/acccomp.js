import {React, useEffect, useRef, useState} from 'react';
import Navbar from './navbar';
import group1 from '../styles/images/group1.png';
import group2 from '../styles/images/group2.png';
import group3 from '../styles/images/group3.png';
import { motion } from "framer-motion";
import pointer from "../styles/images/downarrow.png"
import { useNavigate } from "react-router-dom";
import '../index.css';
import axios from 'axios';

const Acccomp = () => {
    const navigate = useNavigate();
    const loggedinacc = localStorage.getItem('loggedInas');
    const [pfp, setPfp] = useState();

    function getProfilepic() {
        axios
        .post("http://localhost:3001/getprofilepic", {user:loggedinacc})
        .then(res => {
            console.log(res);
            setPfp(res.data[0].profilepicture);
        })
        .catch((err) => console.log(err));
    }
    useEffect(() => {
        getProfilepic();
        console.log(loggedinacc)
    }, [])
    return (

            <div style={{fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='absolute right-5 top-5'>
                <div className='flex'>
                <img className='rounded border-2 border-black w-[30px] h-[auto]' src={pfp}></img>
                <p className='ml-[5px] text-sm text-slate-400'><a href={`/profile/${loggedinacc}`}>{loggedinacc}</a></p>
                </div>
            </div>
    )
}


export default Acccomp;