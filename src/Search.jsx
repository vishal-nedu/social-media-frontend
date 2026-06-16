import React, { useEffect, useState } from 'react'
import Titlebar from './Titlebar'

import Tabs from './Tabs'
import { useNavigate } from 'react-router-dom';


function Search() {
   
    const[users,setusers]=useState([]);
          let userid=localStorage.getItem("userId");
    // const[videos,setVideos]=useState[[]];    
    const navigate=useNavigate();
   
    useEffect(()=>{

    },[users])
    function handleclick()
    {
        let v=document.getElementById('vidn').value;
           if(v==="")
        {
          alert("Enter the username");
          return;
        }
      let us=document.querySelector('.user');
      us.style.display='flex';

      
        //let v=document.getElementById('vidn').value;
     
        console.log(v);
        fetch(`${import.meta.env.VITE_API_URL}/searchusers/${v}/${userid}`)
        .then(data=>data.json())
        .then(res=>{setusers(res)})
        .catch(err=>console.log(err))
        //   fetch(`${import.meta.env.VITE_API_URL}/searchvideos/${v}`)
        // .then(data=>data.json())
        // .then(res=>setVideos(res))
        // .catch(err=>console.log(err))
    }
    function handlefollow(user)
    {
      if(user.following)
      {
         fetch(`${import.meta.env.VITE_API_URL}/unfollow/${userid}/${user.id}`
          ,{method:"DELETE"}
         )
        .then(() => {
            setusers(users.map(u =>
                u.id === user.id
                ? {...u, following:false}
                : u
            ));
        });
      }
      else
      {
          fetch(`${import.meta.env.VITE_API_URL}/follow/${userid}/${user.id}`,{method:"POST"})
        .then(() => {
            setusers(users.map(u =>
                u.id === user.id
                ? {...u, following:true}
                : u
            ));
        });
      }
    }
    if(!localStorage.getItem("userId"))
  {
    return  null;
  }
  return (
    <div>
          <div><Titlebar/></div>
          <div className='sear'>  
            <input type="text" placeholder='Enter the username ' required className='vidn' id='vidn' />
            <button className='bs' onClick={handleclick}>Submit</button>
          </div>
          <div className='user'>
            <h1>users</h1>
           {users.length>0?(
            users.map((us)=>(
              <div className='usdisplay'>
              <div className='disus' key={us.id} onClick={()=>navigate(`/userprofile/${us.id}`)}>
                <img className='usimg rounded-circle' 
                    src={`${import.meta.env.VITE_API_URL}/profile-images/${us.profile_photo}` }
                    alt={us.username}
                 
                />
                <span className='usn'>{us.username}</span>
                <button className='follow' onClick={()=>handlefollow(us)}>{us.following ?"Following":"+Follow"}</button>
            </div>
             </div>
            ))
           ):
           (
            <div>No users found</div>
           )}
          </div>
          <div className="tabs"><Tabs/></div>
    </div>
  )
}

export default Search