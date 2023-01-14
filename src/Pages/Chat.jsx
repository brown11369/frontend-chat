import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { alluserRoute,host } from "../utils/APIRoutes"
import { io } from "socket.io-client";


function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentuser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined)

  const navigate = useNavigate()

  useEffect(() => {
    checkUser();
  }, []);



  useEffect(() => {


    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id);
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

  const Container = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .container{
    height:85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns:35% 65%;
    }
  }
  `

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
          currentChat === undefined ?
            <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        }
      </div>
    </Container>
  )
}
export default Chat;