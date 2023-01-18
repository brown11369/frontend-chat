import "./chatinput.css"
import EmojiPicker from 'emoji-picker-react';
// import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";




const ChatInput = ({ handleSendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (emoji) => {
        let message = msg;
        message = message + emoji.emoji;
        setMsg(message);

    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMessage(msg)
            setMsg("")
        }
    };


    return (
        <div className="chat-input-container">
            <div className="emoji-box">
                <img src="./happy-emoji.svg" onClick={handleEmojiPickerHideShow} alt="emoji" />
                {
                    showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />
                }
            </div>
            <form className="input-form" onSubmit={(event) => { sendChat(event) }}>
                <input type="text" placeholder="Type your message here..." value={msg} onChange={(event) => setMsg(event.target.value)} />
                <button className="submit">
                    <svg width="30px" height="30px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.5004 11.9998H5.00043M4.91577 12.2913L2.58085 19.266C2.39742 19.8139 2.3057 20.0879 2.37152 20.2566C2.42868 20.4031 2.55144 20.5142 2.70292 20.5565C2.87736 20.6052 3.14083 20.4866 3.66776 20.2495L20.3792 12.7293C20.8936 12.4979 21.1507 12.3822 21.2302 12.2214C21.2993 12.0817 21.2993 11.9179 21.2302 11.7782C21.1507 11.6174 20.8936 11.5017 20.3792 11.2703L3.66193 3.74751C3.13659 3.51111 2.87392 3.39291 2.69966 3.4414C2.54832 3.48351 2.42556 3.59429 2.36821 3.74054C2.30216 3.90893 2.3929 4.18231 2.57437 4.72906L4.91642 11.7853C4.94759 11.8792 4.96317 11.9262 4.96933 11.9742C4.97479 12.0168 4.97473 12.0599 4.96916 12.1025C4.96289 12.1506 4.94718 12.1975 4.91577 12.2913Z" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                    </svg>
                </button>
            </form>
        </div>
    )
}


export default ChatInput;