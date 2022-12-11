import {React, useEffect, useState } from 'react';
import Navbar from './navbar';

import { motion } from "framer-motion";
import { FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const Profile = () => {

    const [bio, setBio] = useState('No bio set');
    const [newBio, setnewBio] = useState({bio})
    const navigate = useNavigate();
    const loggedinacc = localStorage.getItem('loggedInas');
    const [modalOpen, setmodalOpen] = useState(false);
    const [pfpModalopen, setpfpModalopen] = useState(false);
    const [image, setImage] = useState();
    const [pfp, setPfp] = useState();

    const userinfo = useParams();
    const user2json= JSON.stringify(userinfo.usr);
    const user = JSON.parse(user2json)
    useEffect(() => {
        if (!loggedinacc) {
            navigate('/login')
        }
        getBio();
        console.log(bio, newBio)
        console.log(pfp, image)
    })

    useEffect(() => {
        getProfilepic();
    }, [])


    function getBio() {
        axios
            .post("http://localhost:3001/getbio", {user})
            .then(res => {
                console.log(res);
                setBio(res.data[0].bio);
            })
            .catch((err) => console.log(err));
    };

    function changeBio() {
        axios
        .post("http://localhost:3001/changebio", {
            user: user,
            bio: newBio.bio
        })
            .then(res => {
                console.log(res);
                setBio(res.data);
                console.log("new bio", newBio)
                setTimeout(getBio(), 1000)
            })
            .catch((err) => console.log(err));

    }

    function getProfilepic() {
        axios
        .post("http://localhost:3001/getprofilepic", {user})
        .then(res => {
            console.log(res);
            setPfp(res.data[0].profilepicture);
        })
        .catch((err) => console.log(err));
    }
    function changeProfilepic() {
        axios.post("http://localhost:3001/changeprofilepic", {
            user: user,
            profilepicture: image
        })
        .then(res => {
            console.log(res);
            setTimeout(getProfilepic(), 1000)
        })
    }

    const convert2base64 = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setImage(reader.result.toString());
        }
          reader.readAsDataURL(file)
  
      }


 
    return (
        <div className='h-screen bg-[#302c2c]'>
            {modalOpen ? <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#302c2c] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-300 rounded-t">
                  <h3 className="text-3xl text-slate-300 font-semibold">
                    Change or add a bio!
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setmodalOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  
                  <input 
                  name='newbio' 
                  className='w-full bg-white text-black shadow text-center' 
                  onChange={(e) => {
                    setnewBio({bio: e.target.value});
                    console.log(newBio);
                }}
                  /> 
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setmodalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        changeBio()
                        setmodalOpen(false)}}
                  >
                    Change bio
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </> : ''}

        {pfpModalopen ? <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#292929] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-slate-300 font-semibold">
                    Change or add a profile picture!
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setpfpModalopen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  
                <input 
                name='image'
                type="file" 
                onChange={(e) => convert2base64(e)}
                className='border-2 text-slate-300 border-black rounded'
                 />
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setpfpModalopen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        changeProfilepic();
                        setmodalOpen(false);}}
                  >
                    Change Profile Picture
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </> : ''}
             <Navbar />
             <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1}}>
            <div style={{fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='bg-[#302c2c]'>
            <div className='mt-[20vh] h-[50vh] container mx-auto'>
                <div className='flex flex-col bg-[#302c2c] p-5 place-items-center'>
                    <div className='text-center text-2xl text-slate-400'>
                    <div className='flex items-center'>
                    {user === loggedinacc ? <FaEdit className='' onClick={()=> setpfpModalopen(true)}/> : ''}
                    <img className='rounded border-4 border-black mx-auto w-[200px] h-[auto]' src={pfp}></img>
                    </div>
                    <p className='mt-[5vh]'>{user}</p>
                    
                    <div className='mt-[5vh] gap-5 grid p-5 place-items-center'>
                    {user === loggedinacc ? <div className='flex items-center' ><FaEdit onClick={()=> setmodalOpen(true)} />  <p className='text-slate-400 border-b-2'>"{bio}"</p></div> :  <p className='border-b-2 text-slate-400'>"{bio}"</p>}
                   
        
                    </div>
                    
                    </div>
                
            </div>
            </div>
            
            
        </div>
        
        </motion.div>
        
        </div>
        
    )
}

export default Profile;