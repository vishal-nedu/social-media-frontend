import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Register from './Register';
function Titlebar() {
  let userid=localStorage.getItem("userId")
  const [streak,setstreak]=useState();
  useEffect(()=>{
    let url=`${import.meta.env.VITE_API_URL}/streak/`
     url=url+userid;
    fetch(url)
    .then(res=>res.json())
    .then(data=>setstreak(data))
    .catch(err=>console.log(err))
  },[])
  // const navigate=useNavigate();
  function handleclick()
  {
    // console.log(userid);
    localStorage.removeItem("userId");
    window.location.reload();
    // navigate("login");

    
  }
  return (
    <div className="title d-flex">
        <div className='start'></div>
        <div className="logo d-flex">
            <h1>SparkNest</h1>
        </div>
        <div className="end d-flex ">
        <div className='str d-flex'><i className="bi bi-fire"></i>{streak}</div>
        <div className='notify d-flex'><i className="bi bi-bell-fill"></i>Notifications</div>
        <div className='logout d-flex'><button onClick={handleclick}>Logout</button></div>
        </div>
    </div>
  )
}

export default Titlebar