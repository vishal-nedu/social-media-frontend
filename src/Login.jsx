import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login({setUserId,setPage}) {
     const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const navigate=useNavigate();
    function changepage()
    {
        setPage("Register");
    }
const handleclick = (e) => {

    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("userId", data.id);
         setUserId(data.id);
        console.log("Loggged in");
        navigate("/");
    })
    .catch(err => console.log(err));
};
  return (
    <div className='cred'>
        <div className="form" onSubmit={handleclick}>
        <form action="login" method="post">
        <label> 
            Enter the user name:
        </label>
        <br/>
        <input type="text" id="un" name="user" value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}} required/>
        <br/>
        <label>Enter the password</label>
        <br/>
        <input type="password" id="ps" name="password" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}} required/>
        <br/>
        <button className='regi' type="submit" id="but">Login</button>

    </form>
    </div> 
    <button className='log1' onClick={changepage}>Register</button>
    </div>
  )
}

export default Login