import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./setavatar.css"
import loader from "../assets/loader.gif"
import { Buffer } from "buffer";

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";


function SetAvatar() {

    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedavatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoclose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const setProfilePicture = async () => {
        if (selectedavatar === undefined) {
            toast.error("Please select an Avatar", toastOptions)
        }
        else {
            const user = await JSON.parse(localStorage.getItem("user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedavatar]
            });
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/")
            }
            else {
                toast.error("Error setting avatar. Please try again.", toastOptions)
            }
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/login")
        }
        fetchImage()
    }, [])

    const fetchImage = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            let image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image?.data);
            data.push(buffer.toString("base64"));
        };
        setAvatars(data);
        setIsLoading(false);
    }

    return (
        <>{
            isLoading ? <div className="avatar-container">
                <img src={loader} alt="loader" className="loader" />
            </div> :
                <div className="avatar-container">
                    <div className="title-container">
                        <h1 className="avatar-picker">Pick an avatar as your profile picture.</h1>
                    </div>
                    <div className="avatars">{avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar ${selectedavatar === index ? "selected" : ""}`}>
                                <img className="avatar-pic" src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => { setSelectedAvatar(index) }} />
                            </div>
                        )
                    })}</div>
                    <button onClick={setProfilePicture} className="submit-btn avatar-button">Set as Profile Picture</button>

                </div>
        }
            <ToastContainer />
        </>
    )
}


export default SetAvatar;
