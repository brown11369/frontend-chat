import axios from "axios";
import "./chatcontainer.css"
import ChatInput from "./ChatInput";
import { sendMessagesRoute } from "../utils/APIRoutes";
import { getMessagesRoute } from "../utils/APIRoutes";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ setHide, currentChat, currentUser, socket }) => {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        getMessages();
    }, [currentChat])

    const getMessages = async () => {
        if (currentChat) {
            const response = await axios.post(getMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            })
            setMessages(response?.data);
        }
    }

    const handleSendMessage = async (message) => {

        await axios.post(sendMessagesRoute, {
            from: currentUser?._id,
            to: currentChat?._id,
            message: message,
        })

        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: message,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: message });
        setMessages(msgs);

    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    return (
        <div className="chat-page-container">
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat?.username}</h3>
                    </div>
                </div>
                <p onClick={() => {
                    setHide("")
                }}>Back</p>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMessage={handleSendMessage} />
        </div>
    )
}
export default ChatContainer;