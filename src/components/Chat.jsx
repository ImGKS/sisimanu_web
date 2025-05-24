import { useEffect, useRef, useState } from 'react';
import { createSocketConnection } from '../utils/socket';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getDateTime } from '../utils/helper';
import axios from 'axios';
import { BASE_URL } from '../utils/urlConstant';
import { toast } from 'react-toastify';

export default function Chat() {
    const params = useParams()
    const toUserId = params.userId;

    const loggedInUser = useSelector((store) => store?.user)
    const loggedInUserId = loggedInUser?._id;

    const [messages, setMessages] = useState([]);
    const [userOnline, setUserOnline] = useState(false);
    const [toUserData, setToUserData] = useState(null);

    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(()=>{
        if(toUserData) {
            if(userOnline) {
                toast.success("user online");
            } else {
                toast.info("user offline.")
            }
        }
    },[userOnline])

    const fetchChats = async() => {
        const chats = await axios.get(BASE_URL + "/chat/" + toUserId, {withCredentials: true} );
        const chatMessages = chats?.data?.data?.messages.map((msg) => {
            return { 
                firstName: msg?.senderId?.firstName,
                text: msg?.text,
                profilePic: msg?.senderId?.profilePic,
                time: getDateTime(msg?.createdAt)
            }
        })
        setMessages(chatMessages)        
    }

    const getProfileData = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/" + toUserId, 
                {withCredentials: true}
            );   
            setToUserData(res.data.data)
        } catch (error) {
            console.log("Error :", error.message);
        } 
    }

    const handleSend = (e) => {
        e.preventDefault()
        const socket = createSocketConnection();
        // send message to server
        socket.emit("sendMessage", {
            firstName: loggedInUser.firstName,
            loggedInUserId,
            toUserId,
            text: input,
            profilePic:loggedInUser.profilePic,
            time: getDateTime(Date.now())
        })
        setInput('');
    };

    useEffect(()=>{
        Promise.allSettled([
            fetchChats(),
            getProfileData()
        ])
    },[])

    useEffect(() => {
        if (!loggedInUser) return
        // socket will be used to emit events
        const socket = createSocketConnection();

        // send events
        // like an api call, joinChat-> url, {toUserId}-> data
        // event name same with server
        socket.emit("joinChat", {loggedInUserId, toUserId})
        // as soon as pageload, make a connection

        socket.on("user-offline", (userId) => {
            if (userId === toUserId) {
                setUserOnline(false);
            }
        });

        socket.on("user-online", (userId) => {
            if (userId === toUserId) {
              setUserOnline(true);
            }
          });

        socket.on("messageReceived", ({ 
            firstName,
            loggedInUserId,
            toUserId,
            text,
            profilePic,
            time
        }) => {
            setMessages(messages => [...messages, { 
                firstName,
                loggedInUserId,
                toUserId,
                text,
                profilePic,
                time
            }])
        })

        // need to cleanup
        return () => {
            socket.emit("leaveChat", { loggedInUserId, toUserId });
            socket.disconnect();
        }
    },[loggedInUserId, toUserId])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div
            className="flex flex-col items-center justify-center h-screen p-4"
            style={{
                background:
                    'linear-gradient(90deg, rgba(131, 58, 180, 1) 8%, rgba(179, 66, 66, 1) 57%, rgba(99, 17, 17, 1) 100%)'
            }}
        >
            <form
                className="w-[60%] h-[70vh] backdrop-blur-md bg-white/20 rounded-2xl shadow-xl flex flex-col p-4 border border-white/30"
            >
                {toUserData &&
                    <div className='text-left pb-1 flex items-center w-full text-xl text-white/70'>
                        <img src={toUserData.profilePic} alt="avatar" className="w-10 h-10 rounded-full" />
                        <div>
                            <h4 className="text-xl px-3 font-semibold text-white">{toUserData.firstName}</h4>
                            <h5 className={`ml-2 text-sm ${userOnline ? "text-green-400" : "text-gray-400"}`}>
                                ● {userOnline ? "Online" : "Offline"}
                            </h5>
                        </div>
                    </div>
                }
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.firstName === loggedInUser.firstName ? 'justify-end' : 'justify-start'}`}>
                            <div className="flex items-center space-x-2">
                                <div>
                                    <div className={`rounded-xl px-4 py-2 mt-1 max-w-xs text-white ${msg.firstName !== loggedInUser.firstName ? 'bg-blue-500/80' : 'bg-gray-500/70'}`}>
                                        {msg.text}
                                    </div>
                                    <div className="text-xs text-white/60 mt-1">{msg.firstName === loggedInUser.firstName ? `Sent at ${msg.time}` : msg.time}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="mt-4 flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow bg-white/30 placeholder-white text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                        onClick={(e) =>handleSend(e)}
                        className="ml-2 px-4 py-2 bg-pink-500  text-white rounded-lg hover:bg-pink-600 "
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
