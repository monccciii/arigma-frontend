import {React, useEffect, useRef, useState} from 'react';
import Navbar from './navbar';
import group1 from '../styles/images/group1.png';
import group2 from '../styles/images/group2.png';
import group3 from '../styles/images/group3.png';
import { motion } from "framer-motion";
import pointer from "../styles/images/downarrow.png"
import { useNavigate } from "react-router-dom";
import '../index.css';
import art1 from '../styles/images/art-1.jpeg'
import thumbsup from '../styles/images/thumbsup.png'

import axios from 'axios';



const Post = (props) => {
    const navigate = useNavigate();
    const [servres, setServres] = useState('');


    function likeapost() {
        console.log(props.title, props.poster, "test")
        const loggedinuser = localStorage.getItem('loggedInas')

        axios.post("http://localhost:3001/likepost", {
            user: loggedinuser,
            title: props.title,
            sender: props.poster,
            
    
        })
        .then(res => {
            console.log(res.data);
            setServres(res.data);

        })
        
    }
    
    return (
            <div style={{fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='bg-[#302c2c]'>
                <div className="grid border-2 border-slate-600 place-items-center">
                    <p className='text-slate-400 text-center'>"{props.title}"</p>
            <img className='border-4 border-black w-[100%] h-[auto]' src={props.img}></img>
                <div className='flex'>
                    <img onClick={likeapost} src={thumbsup}></img>
                    <p className='text-green-500'>{props.likes ? props.likes : '0'}</p>
                </div>
                    <p className='text-slate-400 pl-5 pr-5 mb-[15vh]'>{props.description}</p>
                    <p className='text-slate-400 underline'><a href={`/profile/${props.poster}`}> {props.poster}</a></p>
                    {servres === false ? <p className='bg-red-500 text-white '>Already liked this post.</p> : ''}
                

            </div>
</div>    

    )
}

export default Post;