import React from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        username: "",
        password: "",
    });
    const [isLoggedin, setIsloggedin] = useState()
    const [responseData, setresponseData] = useState()
    const [isFilledout, setIsFilledout] = useState();


    const handleChange = (e) => {
        const { name, value } = e.target;

        setAccount((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        })
    }

    function ifLoggedin(rpdata) {
        if (rpdata === true) {
            localStorage.setItem('loggedInas', account.username)
            navigate('/home')
            setIsloggedin(true)
        } else if (rpdata === false) {
            console.log('woops')
            if (isFilledout == false) {
                setIsloggedin();
            } else {
                setIsloggedin(false)
            }
        }
    }

    useEffect(() => ifLoggedin(responseData))



    const handleClick = async (e) => {
        try {
            const data = 
            e.preventDefault()
            if (account.username.length == 0 || account.password.length == 0) {
                setIsFilledout(false);
            } else {
                setIsFilledout(true);
                const response = await axios
            .post("http://localhost:3001/login", account)
            .then(res => setresponseData(res['data'])) }
        } catch(err) {
            console.log(err);
        }
    }



    return (
        <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5}}>
        <div style={{height:'100vh', fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='bg-art1 bg-no-repeat bg-cover'>
            <Navbar />
            <div className='bg-[#302c2c] border-b-4 border-black'>
            <p className='border-t-4 border-black p-5 mt-[25vh] text-slate-300 text-center text-xl sm:text-5xl'>Login to &nbsp;A R I G M A</p>
           

            <div className='mt-[5vh] pb-5 container mx-auto'>
                <div className='grid place-items-center'>
                    <form>
                    <p className='text-slate-300'>Username</p>
                <input 
                name="username"
                value={account.username}
                className='rounded h-[5vh] border-2'
                onChange={handleChange}></input>
                <p className='text-slate-300'>Password</p>
                <input 
                className='rounded h-[5vh] border-2'
                name="password"
                value={account.password}
                type="password"
                onChange={handleChange}
                ></input>
                </form>
                <button onClick={handleClick} className='mt-[1vh] pl-8 pr-8 bg-blue-500 text-white rounded'>Login</button>
                <button onClick={() => {navigate('/register')}} className='mt-[1vh] pl-8 pr-8 bg-[#292929] border-2 text-slate-300 rounded'>Want to register?</button>
                </div>
                </div>
        
            </div>
            {isLoggedin === false && <div className='mt-[5vh] bg-red-500 rounded text-center text-white'>
                    Incorrect username or password. Please try again or <a href="/register">make a new account. </a>
                    </div>}

            
                    {isFilledout === false && 
                <div className='mt-[5vh] bg-red-500 rounded text-center text-white'>
                    Please fill out all fields.
                    </div>}
        
        </div>
        </motion.div>
    )
}

export default Login;