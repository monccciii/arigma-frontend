import {React, useState} from 'react';
import Navbar from './navbar';
import group1 from '../styles/images/group1.png';
import group2 from '../styles/images/group2.png';
import group3 from '../styles/images/group3.png';
import { AnimatePresence, motion } from "framer-motion";
import pointer from "../styles/images/downarrow.png"
import { useNavigate, useParams } from "react-router-dom";
import '../index.css';
import {useEffect, useReducer} from 'react'
import axios from 'axios';
import '../styles/secondary.css'
import Loading from './loadingscreen';

const Chat = () => {
    const navigate = useNavigate();


    const chatroom = useParams();



    const user = localStorage.getItem('loggedInas')

    const [modalOpen, setmodalOpen] = useState(false);
    const toggle = () => setmodalOpen(!modalOpen);
    const [chatOpen, setchatOpen] = useState(false);
    const [currChatroom, setcurrChatroom] = useState('');
    const [isNamelegal, setisNamelegal] = useState(true);

    const [isLoading, setisLoading] = useState(false);

    const [messages, setMessages] = useState( [] ); 
    const [messagecontent, setMessagecontent] = useState({
        from: '',
        chat: "",
    });
    const [chatroomname, setChatroomname] = useState({
        chatroomname: ''
    });
    const [chatrooms, setChatrooms] = useState( [] );

    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [reducerValue]);



function getMessages() {
    const url = `http://localhost:3001/messages/${currChatroom}`
    axios.get(url)
    .then(res => {
        console.log(res);
        setMessages(res.data);
        console.log(messages);
    })
    .catch(err => console.log(err));
}

function getChatrooms() {
    axios.get("http://localhost:3001/chatrooms")

    .then(res => {
        console.log(res);
        setChatrooms(res.data);
    })
    .catch(err => console.log(err));
}

useEffect(() => {
    setisLoading(true);
    setTimeout(() => {setisLoading(false)}, 2900);
}, [])

useEffect(() => {
    const interval = setInterval(() => {
        getChatrooms();
      }, 2000);
      return () => 
      {
        clearInterval(interval) };
    }, [getMessages]);

    useEffect(() => {
        if (chatOpen) {
            try {
                const interval = setInterval(() => {
                    getMessages()
                }, 1000);
                return () => clearInterval(interval);
            } catch {

            }
        } 
    }, [reducerValue]);


    useEffect(() => {
        if (!chatOpen) {
            setMessages('');
        }
    })
    console.log(user)

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(user)
        console.log("current chatroom:", currChatroom)
        setMessagecontent((prev) => {
            return {
                ...prev,
                [name]: value,
                from: user
            }
        })
        console.log(messagecontent)
    }

    const handleChangeChatroomName = (e) => {
        const evt = e.target.value
        if (evt === 'chatroom') {
            setisNamelegal(false);
            console.log(evt)
        } else {
            setisNamelegal(true);
        setChatroomname({chatroomname:evt});
        }
       
    }

    const handleClick = (e) => {
        e.preventDefault();
        const url = `http://localhost:3001/sendmessage/${currChatroom}`

        axios
        .post(url, messagecontent)
        .then(res => console.log(res))
        .catch((err) => console.log(err))
        messagecontent.chat = ''
       forceUpdate()
        forceUpdate()
    }

    const handleClickChatroomName = (e) => {
        e.preventDefault();

        console.log("bruh:", chatroomname)
        try {
            try {
            axios
        .post("http://localhost:3001/createchatroom", chatroomname)
        .then(res => console.log(res))
        .catch((err) => console.log(err))
        console.log("bruh:", chatroomname)
            } finally {
        chatroom.chatroomname = ''
            }
        } finally {
            setmodalOpen(false);
       forceUpdate()
        forceUpdate()
        forceUpdate()
        forceUpdate()
        forceUpdate()
        }
    }
    return (
        <div className='bg-[#292929] h-screen'>
            {isLoading === true ? <AnimatePresence><Loading time='0' /></AnimatePresence> : ''}
            {isLoading === true ? '' : <motion.div
            initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5}}><Navbar /></motion.div>}
            {/*https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular */}
             {modalOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-300 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  
                  <h3 className="text-3xl font-semibold">
                    Create a new chatroom!
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
                <div className="relative p-6 flex-auto">
                  
                  <input
                          name='chatroomname'
                          className='ml-[25%] bg-white text-black shadow text-center'
                          onChange={handleChangeChatroomName}
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
                    onClick={handleClickChatroomName}
                  >
                    Create Chatroom
                  </button>
                
                </div>
                {!isNamelegal ? <div className='bg-red-500 rounded text-center text-white'><p>Chatroom name not allowed.  Please put another name.</p></div> : ''}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

{chatOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-[70%] my-6 mx-auto max-w-5xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#302c2c] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b-2 border-solid border-slate-300 text-slate-300 rounded-t">
                    <p>{currChatroom}</p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-slate-300 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setchatOpen(false)}
                  >
                    <span className="bg-transparent text-slate-300 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*https://play.tailwindcss.com/piFbOgE3I0*/}
                <div className="relative p-6 overflow-y-auto overflow-x-hidden h-[50vh] max-h-[50vh] flex-auto">

                {messages.length === 0 ? <div><p className='text-center text-slate-300'>No messages. </p><p className='text-center text-slate-300'>Send a message and get the conversation started!</p></div> : messages.map((message, index) => {
                    if (message.from === user) {
                        return <div key={index} className="flex mb-[1vh] flex-row space-x-2">
                        <div className="mt-[1vh] flex flex-col ml-[auto] items-start space-y-1 max-w-[60%]">
                            <div className="flex flex-col p-2 bg-blue-500 rounded ">
                                <span className="text-xs text-slate-700 text-right font-semibold tracking-tight"><a href={`/profile/${message.from}`}>{message.from}</a></span>
                                <p className="text-md text-white font-base">{message.messagecontent}</p>
                            </div>
                        </div>
                    </div>
                    
                    } else {
                        return <div key={index}>
                
                <div className="flex flex-col mb-[1vh] items-start space-y-1">
                            <div className="mt-[1vh] flex flex-col p-2 bg-green-500 rounded max-w-[60%]">
                                <span className="text-xs text-slate-700 font-semibold tracking-tight"><a href={`/profile/${message.from}`}>{message.from}</a></span>
                                <p className="text-md text-white font-base">{message.messagecontent}</p>
                            </div>
                        </div>
                    </div>
                    }
                })}

                
                  {/* <div key={index}>
                
                <p>{message.from}</p>
                <p>{message.messagecontent}</p>
            </div>    
            
            <div key={index}>
                
                        <p className='ml-[auto] w-1/2 text-right'>{message.from}</p>
                        <p className='ml-[auto] text-left bg-blue-500 rounded '>{message.messagecontent}</p>
                    </div>
            */}      
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 pl-12 pr-10 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="text-red-500 background-transparent font-bold uppercase px-5 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setchatOpen(false)}
                  >CLOSE</button>
                <input 
                        name="chat"
                        value={messagecontent.chat}
                        className='w-[50vh] border-2 border-slate-500 rounded bg-white text-black shadow text-center'
                        onChange={handleChange}
                        />
                  <button
                    className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

            <div style={{height:'90vh', fontFamily:"'Poppins', sans-serif", fontWeight:'300'}} className='bg-[#302c2c]'>

            <div>
                
                <div className='grid'>
            
              
          {/* <button
            variant="bg-white"
            onClick={handleClickChatroomName}
            >
                        MAKE CHATROOM
    </button> */}

                        
            <button onClick={toggle} className='bg-green-500 text-white'>Create New Chatroom</button>


                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {chatrooms.map((chatroom)=>
            <motion.div
            initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1}}>
                <div key={chatroom.chatroomname} className='grid text-center text-slate-400 mt-[6%] h-[6vh]'>
                <p onClick={() => {
                    setchatOpen(true);
                    try {
                        setcurrChatroom(chatroom.chatroomname);
                    } finally {
                        getMessages()
                        forceUpdate()
                    }
                   
                }} className='shadow'>{chatroom.chatroomname}</p>
                  </div>
                  </motion.div>
                )
            }         
            </div>
                
              {/* <input
                          name='chatroomname'
                          className='bg-black text-white ml-[20vw]'
                          onChange={handleChangeChatroomName}
                          /> 
              
            <button
            variant="outline-light"
            onClick={handleClickChatroomName}
            >
                        MAKE CHATROOM
                    </button>
              */}
            </div>
          </div>
        </div>
    )
}

export default Chat;