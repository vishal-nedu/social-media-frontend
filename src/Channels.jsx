import React, { useEffect, useState } from 'react'

function Channels() {
  const[discovery,setDiscovery]=useState({
    title:"",
    content:""
});
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/discovery`)
    .then(data=>data.json())
    .then(res=>{setDiscovery(res); console.log(res)})
    .catch(err=>console.log(err));
  },[])
  return (
    <div className='ch'>
          ✨ Discovery
        <div className='cl'>
            <h2 className='discovery-title'>{discovery.title}</h2>
            <h4 className='discovery-content'>{discovery.content}</h4>
        </div>
    </div>
  )
}

export default Channels