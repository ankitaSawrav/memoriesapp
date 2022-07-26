// import { Grid , Paper ,TextField } from'@material-ui/core'
import './signup.css'

import axios from 'axios';
import { useState} from 'react';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';



function Login(props){
    console.log(props,"props")
    const[useremail,setEmail]= useState("")
    const[password,setPassword]= useState("")
    const[errorMsg,setErrorMsg]= useState("")
    const navigate = useNavigate();
    const handleChange=(event)=>{
        if(event.target.className === "email"){
            // console.log("inhere ")
            // setEmail({[event.target.className]:event.target.value})
            setEmail(event.target.value)
        }
        if(event.target.className === "password"){
            // console.log("inhere ")
            // setPassword({[event.target.className]:event.target.value})
            setPassword(event.target.value);
        }
        console.log(event.target.className,event.target.value, "email&password")
    }


    const handleSubmit=(event)=>{
        event.preventDefault();
      const data={
        "useremail":useremail,
        "password":password
      }
    //   console.log(data,"data")
      axios.post("/api/session", data)
      .then((response)=>{
        console.log(response.data,"response")
        props.setIsLoggedin(true)
        navigate('/', {replace: true});
        
      })
      .catch(error=>{
        // console.log(error.response.data.message,"error")
        setErrorMsg(error.response.data.message)

      })
    }
    // code to style
        const paperStyle= {padding:20, height:'70vh', width:280, margin:"20px auto"}

    return (
        <div className='loginContainer'>
        {!props.isLoggedin? 
         <div className="login-form">
                {errorMsg? <p>{errorMsg}</p>:""}
                <h1 className='title'>Login</h1>
                <form className='form' onSubmit={(event) => handleSubmit(event)}>
                    {/* <label className="username-label" htmlFor="username">Username:</label>
                        <input 
                            className="username"
                            type="text" 
                            placeholder='Username' 
                            name='username' 
                            onChange={(event) => handleChange(event)}
                        /> */}
                        <div className= "inputContainer">
                        <label className="email-label"htmlFor="email" required>Email</label>
                        <input 
                            className="email"
                            type="text" 
                            placeholder='Email' 
                            name='email' 
                            onChange={(event) => handleChange(event)}
                            required
                        />
                        </div>
                        <div className= "inputContainer">
                        <label className="password-label" htmlFor="password">Password</label>
                        <input 
                            className="password"
                            type="password" 
                            placeholder='Password' 
                            name='password' 
                            onChange={(event) => handleChange(event)}
                            required
                        />
                        </div>
                        
                        <button className="createUser" 
                            type='submit'
                            onSubmit = {(event)=>handleSubmit(event)}
                            >Login
                        </button>
                        <span>
                            Don't have an account? 
                            {/* <Routes> */}
                            {/* <Route path='/' element={<HomePage/>}/> */}
                            {/* </Routes> */}
                           
                        
                        </span>
                            <Link to='/Signup'>Signup</Link>
                </form>

        </div> 
        : ""}
    </div>
    )
}

export default Login