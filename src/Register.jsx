import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register({setPage}) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    phone_number: "",
    email_id: "",
    age: "",
    password: ""
});
const navigate=useNavigate();
function changepage()
{
    setPage("login");
}
const handleclick = (e) => {

    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        // localStorage.setItem("userId", data.id);
        console.log("Registered");
        setPage("login");
    })
    .catch(err => console.log(err));
};
 return (
    <div className='cred'>
    <div className='form'>
        <form  onSubmit={handleclick}>
        <label>Enter name:</label>
       <br />
        <input type="text" name="user" value={user.name} onChange={(e)=>{setUser({...user,name:e.target.value})}} required/>
        <br />
        <label>Enter Username:</label>
       
        <input type="text" name="user-name" value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}} required/>
    
        <label>Enter Mobile number:
        </label>
       
        <input type="text" name="mobile" value={user.phone_number} onChange={(e)=>{setUser({...user,phone_number:e.target.value})}} required/>
       <br />
       <label>Enter age:</label>
       <br />

        <input type="text" name="age" value={user.age} onChange={(e)=>{setUser({...user,age:e.target.value})}} required/>
        <br />
        <label>Enter email:</label>
        <br />
      
        <input type="email" name="mail" value={user.email_id} onChange={(e)=>{setUser({...user,email_id:e.target.value})}} required/>
        <br />
        
        <label>Enter Password:</label>
       
        <input type="password" name="ps" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}} required/>
        <br />
      
        <button className="regi" type="submit">Register</button>
        
        </form>
        <button className='log' onClick={changepage}>Log In</button>
    </div>
    </div>
  )
}

export default Register