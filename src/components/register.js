import React from 'react';
import {useEffect, useState} from "react";
import Navbar from './navbar';
import { motion } from 'framer-motion';
import art1 from '../styles/images/art-1.jpeg';
import art2 from '../styles/images/art-2.jpg';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [account, setAccount] = useState({
        username: "",
        password: "",
        bio: "",
    });
    const [isSuccessfullyCreated, setSuccessfullycreated] = useState();
    const [doesaccountexist, setDoesaccountexist] = useState();
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

    useEffect(() => {
        checkIfavailabletoregister();
    }, [doesaccountexist])

    const checkIfaccountexists = () => {
        axios
        .post("http://localhost:3001/isnameregistered", account)
        .then(res => {
            console.log(res);
            setDoesaccountexist(res.data);
        })
        .catch((err) => console.log(err));
            
    }

    const checkIfavailabletoregister = () => {
        if (doesaccountexist === true) {
            axios
            .post("http://localhost:3001/register", account)
            .then(res => console.log(res))
            .catch((err) => console.log(err));
            setSuccessfullycreated(true)
            setTimeout(() => { navigate('/login'); }, 1000)
            }
            else {
                console.log(doesaccountexist)
                console.log('already exists')
            }
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (account.username.length == 0 || account.password.length == 0) {
            setIsFilledout(false);
        } else {
            setIsFilledout(true);
            checkIfaccountexists();
        }
    }


    return (
        <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5}}>
        <div style={{height:'100vh', fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='bg-art2 bg-no-repeat bg-cover'>
            <Navbar />
            <div className='bg-[#292929] border-black border-b-4'>
            <p className='p-5 border-t-4 border-black mt-[25vh] text-slate-300 text-center text-xl sm:text-5xl'>Register to &nbsp;A R I G M A</p>
           

            <div className='mt-[5vh] container mx-auto'>
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
                <button onClick={handleClick} className='mt-[1vh] pl-8 pr-8 bg-blue-500 text-white rounded'>Sign up</button>
                <button onClick={() => {navigate('/login')}} className='mt-[1vh] pl-8 pr-8 mb-[2vh] bg-[#292929] border-2 text-slate-300 rounded'>Want to login?</button>
                </div>
                </div>
                {isSuccessfullyCreated === true && 
                <div className='mt-[5vh] bg-green-500 rounded text-center text-white'>
                    Account successfully created! Welcome to &nbsp; A R I G M A
                    </div>}

                    {isFilledout === false && 
                <div className='mt-[5vh] bg-red-500 rounded text-center text-white'>
                    Please fill out all fields.
                    </div>}
                    {doesaccountexist === false &&
                        <div className='mt-[5vh] bg-red-500 rounded text-center text-white'>
                    Account already exists, please create a new account or login.
                    </div>
                    }

            </div>
        
        </div>
        </motion.div>
    )
}

export default Register;