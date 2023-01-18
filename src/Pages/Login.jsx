import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./reglog.css"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";


function Login() {
  const navigate=useNavigate();

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  })

  const [showPassword,setShowPassword]=useState("password")
  
  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/")
    }
  },[])

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setFormdata({ ...formdata, ...newInput })
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    if (handleValidation()) {
      const {email, password} = formdata;

      const {data}=await axios.post(loginRoute,{email, password})
      if(data.status===false){
        toast.error(data.message)
      }
      if(data.status===true){
        localStorage.setItem("user",JSON.stringify(data.userCheck))
        navigate("/")
      }
    }
  }

  const toastOptions = {
    position: "bottom-right",
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const handleValidation = () => {
    const {email, password} = formdata;
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false
    }
    else if (password==="") {
      toast.error("Email and Password is required.", toastOptions);
      return false
    }
    return true;
  }


  return (
    <>
      <div className="login-formcontainer">
        <form className="login-form" onSubmit={(event) => { handleSubmit(event) }}>
          <div className="brand">
            <img className="app-image" src="./vito.png" alt="Vito-Logo" />
            <h1 className="app-heading">Chat</h1>
          </div>
          <input className="login-input" type="text" placeholder="Email" name="email" onChange={(event) => { handleInput(event) }} />
          <input className="login-input" type={showPassword} placeholder="Password" name="password" onChange={(event) => { handleInput(event) }} />
          <p onClick={()=>{
            if(showPassword==="password"){
              setShowPassword("text")
            }
            else{
              setShowPassword("password")
            }
          }}>Show & Hide Password</p>
          <button className="login-button" type="submit">Login</button>
          <span className="reg-text">Don't have an account? <Link className="reg-link" to="/register">Register</Link> </span>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}


export default Login;
