import { useEffect, useState } from "react";
import Logout from "./Logout";

import "./contact.css"


const Contacts = ({setHide, contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);


    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser?.avatarImage)
            setCurrentUserName(currentUser?.username)
        }
    }, [currentUser])


    const changeCurrentChat = (contact, index) => {
        setCurrentSelected(index);
        changeChat(contact)
    }

    return (
        <>
            {
                currentUserImage && currentUser && (
                    <div className="contact-container">
                        <div className="contact-header">
                            <div className="brand">
                                <img src="./vito.png" alt="Vito-Logo" />
                                <h3>Vito</h3>
                            </div>
                            <Logout />
                        </div>
                        <div className="contacts">
                            {
                                contacts?.map((contact, index) => {
                                    return (
                                        <div key={index} className={`contact ${index === currentSelected ? "selected" : ""}`} onClick={() => {
                                            changeCurrentChat(contact, index);
                                            setHide("hide")
                                        }}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact?.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact?.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        </>)
}

export default Contacts;