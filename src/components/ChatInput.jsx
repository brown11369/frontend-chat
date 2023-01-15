import "./chatinput.css"
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
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
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />
                    }
                </div>
            </div>
            <form className="input-form" onSubmit={(event) => { sendChat(event) }}>
                <input type="text" placeholder="Type your message here..." value={msg} onChange={(event) => setMsg(event.target.value)} />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}


export default ChatInput;