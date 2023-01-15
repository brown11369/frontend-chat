import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { alluserRoute, host } from "../utils/APIRoutes"
import { io } from "socket.io-client";

import "./chat.css"

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentuser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined)

  const navigate = useNavigate()

  useEffect(() => {
    checkUser();
  }, []);



  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);


  useEffect(() => {
    fetchContacts();
  }, [currentUser]);

  const checkUser = async () => {
    if (localStorage.getItem("user")) {
      setCurrentuser(await JSON.parse(localStorage.getItem("user")))
    }
    else {
      navigate("/login")
    }
  }


  const fetchContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${alluserRoute}/${currentUser._id}`);
        setContacts(data.data)
      }
      else {
        navigate("/setavatar")
      }
    }
  }



  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <>
      <div className="chat-container">
        <div className="chat-inner-container">

          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />

          {
            currentChat === undefined ?
              <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          }
        </div>
      </div>
    </>
  )
}


export default Chat;

