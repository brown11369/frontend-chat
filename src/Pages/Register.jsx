import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./reglog.css"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";


function Register() {
  const navigate=useNavigate();
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
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
      const { username, email, password} = formdata;
      const {data}=await axios.post(registerRoute,{username, email, password})
      if(data.status===false){
        toast.error(data.message)
      }
      if(data.status===true){
        localStorage.setItem("user",JSON.stringify(data.userData))
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
    const { username, email, password, confirmpassword } = formdata;
    if (username.length < 4) {
      toast.error("Username should be greater than 4 charcters", toastOptions);
      return false
    }
    else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false
    }
    else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 charcters.", toastOptions);
      return false
    }
    else if (password !== confirmpassword) {
      toast.error("Password and Confirm Password should be Same.", toastOptions);
      return false
    }
    return true;
  }


  return (
    <>
      <div className="reg-formcontainer">
        <form className="register-form" onSubmit={(event) => { handleSubmit(event) }}>
          <div className="brand">
            <img className="app-image" src="./vito.png" alt="Vito-Logo" />
            <h1 className="app-heading">Chat</h1>
          </div>
          <input className="register-input" type="text" placeholder="User Name" name="username" onChange={(event) => { handleInput(event) }} />
          <input className="register-input" type="text" placeholder="Email" name="email" onChange={(event) => { handleInput(event) }} />
          <input className="register-input" type={showPassword} placeholder="Password" name="password" onChange={(event) => { handleInput(event) }} />
          <input className="register-input" type={showPassword} placeholder="Confirm Password" name="confirmpassword" onChange={(event) => { handleInput(event) }} />
          <p className="shpassword" onClick={()=>{
            if(showPassword==="password"){
              setShowPassword("text")
            }
            else{
              setShowPassword("password")
            }
          }}>Show & Hide Password</p>
          <button className="register-button" type="submit">Create Account</button>
          <span className="login-text">Already have an account? <Link className="login-link" to="/login">Login</Link> </span>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}


export default Register;
