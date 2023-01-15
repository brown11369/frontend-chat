import "./welcome.css"

const Welcome = ({ currentUser }) => {
    return (
        <div className="welcome-container">
            <img src="./vito.png" alt="Vito-Logo" />
            <h1> Welcome, <span> {currentUser?.username}</span></h1>
            <h3>Please select a chat to start Messaging...</h3>
        </div>
    )
}

export default Welcome;
