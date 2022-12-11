import {React, useEffect, useState} from 'react';
import Navbar from './navbar';
import group1 from '../styles/images/group1.png';
import group2 from '../styles/images/group2.png';
import group3 from '../styles/images/group3.png';
import { motion, AnimatePresence } from "framer-motion";
import pointer from "../styles/images/downarrow.png"
import { useNavigate } from "react-router-dom";
import '../index.css';
import art1 from '../styles/images/art-1.jpeg'
import thumbsup from '../styles/images/thumbsup.png'
import Post from './post';
import axios from 'axios';
import Loading from './loadingscreen';

const Home = () => {
    const navigate = useNavigate();
    const [modalOpen, setmodalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [postLoading, setispostLoading] = useState(false);
    const [isLoading, setisLoading] = useState(false);


    const loggedInas = localStorage.getItem('loggedInas');

    useEffect(() => {
      if (!loggedInas) {
        navigate('/login')
      }
      
    })

    useEffect(() => {
      getPosts();
      setisLoading(true);
      setTimeout(() => {setisLoading(false)}, 6000);
      
  }, [])

    useEffect(() => {
      if (!isLoading) {
        getPosts();
      }
    })
    
    function getPosts() {
      console.log('getting posts')
      setispostLoading(true)
      axios.get("http://localhost:3001/posts")
    .then(res => {
        console.log(res);
        setPosts(res.data);
        setispostLoading(false);
    })
    .catch(err => console.log(err));
    }

    function createPost() {
      axios.post("http://localhost:3001/create", {
      sender: loggedInas,
      title: title,
      description: description,
      image: image,
      })
      .then(res => {
        console.log(res);
        console.log(title, description, image)
    })
    .catch((err) => console.log(err));
    }

    //https://www.youtube.com/watch?v=pxkE2tT6Y-o
    const convert2base64 = e => {
      const file = e.target.files[0]
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result.toString());
      }
        reader.readAsDataURL(file)

    }


    return (
        <div>
             {isLoading === true ? <AnimatePresence><Loading time='4'/></AnimatePresence> : ''}
            {isLoading === true ? '' : <motion.div
            initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5}}><Navbar /></motion.div>}
             {modalOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#292929] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  
                <h3 className="text-3xl text-slate-300" style={{fontFamily:"'Poppins', sans-serif", fontWeight:'300'}}>
                    Create a new post!
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setmodalOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 ">
                <div className='mt-[5vh] pb-5 container mx-auto'>
                <div className='grid place-items-center'>
                <input
                placeholder='title'
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border-2 mb-[1vh] border-black rounded'
                />
                <input
                name="description" 
                value={description}
                placeholder='description'
                onChange={(e) => setDescription(e.target.value)}
                className='border-2 mb-[1vh] border-black rounded'
                />

                <input 
                name='image'
                type="file" 
                onChange={(e) => convert2base64(e)}
                className='border-2 border-black text-slate-300 rounded'
                 />
                  </div>
                  </div>
                <img src={image}></img>
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center gap-10 p-6 border-t border-solid border-slate-200 rounded-b">
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
                    onClick={createPost}
                  >
                    Create Post
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
            
            <div style={{fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='bg-[#292929] h-screen'>
            <div className='bg-[#292929]'>
            <motion.div
      initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1}}>
          <div>
            {isLoading === true ? '' :<p className='text-slate-400 text-center' onClick={() =>setmodalOpen(true)}><span className='border-2 underline border-slate-100'>Make a new post!</span></p>}
          </div>
            <div className='mx-auto flex flex-col-reverse h-[50%] w-[50%]'>


           {isLoading === false ? postLoading == true ? <p className='mt-[10vh] border-2 text-center border-slate-600 text-slate-400 text-xl'>Posts are loading. Please wait a few moments...</p> : '' : ''} 
            {posts.map((post, index) => {
            return (
              
              <motion.div
              initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1}}><Post key={index} id={post._id} title={post.title} poster={post.sender} img={post.image} likes={post.likes} description={post.description}/></motion.div>
          
            )}
            )}
            </div>
            </motion.div>
            </div>
          </div>
        </div>
    )
}

export default Home;