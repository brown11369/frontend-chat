import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi"

import "./logout.css"

const Logout = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/login")
    }




    return (
        <button className="logout-button" onClick={handleClick}>
            <BiPowerOff />
        </button>
    )
}
export default Logout;