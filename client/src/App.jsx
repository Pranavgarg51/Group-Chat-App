import React from 'react'
import io from "socket.io-client";
import "./App.css";
import { useState, useEffect} from "react";


const socket = io("http://localhost:5000");
const App = () => {
  const [username, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages([...messages, message]);
    }
    )

  }, [messages, socket])

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageData = {
      message: newMessage,
      user: username,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    };
    
    !newMessage == "" ? socket.emit("send-message", messageData) : alert("Message can not be empty")
  setNewMessage("");
  };
  

  return (
    <>
    
      <div className="w-screen h-screen bg-gray-100 flex justify-center items-center " id='root'>
        {chatActive ? (
          <div className="rounded-md p-2 w-full md:w-[80vw] lg:w-[40vw]" id="chatbox">
            <h1 className="text-center font-bold text-xl my-2 uppercase " id="status"><i> Group Chat</i></h1>
            <div>
              <div className="overfllow-scroll h-[80vh] lg:h-[60vh]" id="chat">
                {
                  messages.map((message, index) => {
                    return (
                   
                      <div key={index} className={`flex rounded-md shadow-md my-5 w-fit h-14 ${username === message.user && "ml-auto" }`}>
                        <div className="bg-green-400 flex justify-center items-center rounded-l-md">
                          <h3 className="font-bold text-lg px-2">{message.user.charAt(0).toUpperCase()}</h3>
                        </div>
                        <div className="px-2 " id="msg">
                          <span className="text-sm" id="user">{message.user}</span>
                          <h3 className="font-bold" id="message">{message.message}</h3>
                          <h3 className="text-xs text-right" id="time">{message.time}</h3>
                        </div>
                       
                      </div>
                      
                     
                    )
                  })
                }
               
              </div>
            
              <form className="flex gap-1 md:gap-1 justify-between" onSubmit={handleSubmit}>
                <input type="text" placeholder="Type your message..."value={newMessage}
                  className=" w-full rounded-md border-2 outline-none px-3 py-2"id="text"
                  onChange={(e) => setNewMessage(e.target.value)}></input>
                <button type="submit" className="px-3 py-2 bg-green-500 text-white rounded-md font-bold" id="send">Send</button>
              </form>
            </div>
          </div>
        ) : (
         
         
          <div className="  flex-wrap justify-center items-center gap-2  home" id="entery">
         <h1 id="title"><i>Join Chat</i></h1>
            <input type="text" name="" id="" value={username} onChange={(e) => setUserName(e.target.value)} className="text-center px-3 py-2 outline-none border-2 rounded-md username" 
            placeholder="Enter your username..."/>
           <br></br><br></br>
            <button type="submit" className="chat"
              onClick={() => !username == "" && setChatActive(true)}>Start Chat</button>
          
          </div>)}
      </div>
     

    </>
  )
};
export default App