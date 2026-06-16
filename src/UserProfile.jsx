import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserProfile() 
{
    const {id}=useParams();
    const[Profi,setProfile]=useState({
        username:"",
        age:"",
        profile_photo:""
    });
    const[follow ,setfollow]=useState(false);
      const[videos,setVideos]=useState([]);
      const userid=localStorage.getItem("userId");
    useEffect(()=>{
        // let usid=Number(id);
        fetch(`${import.meta.env.VITE_API_URL}/user/${id}`)
        .then(data=>data.json())
        .then(res=>{setProfile(res),console.log(res)})
        .catch(err=>console.log(err))

        fetch(`${import.meta.env.VITE_API_URL}/uservideos/${id}`)
        .then(data => data.json())
        .then(res => {setVideos(res); 
                      console.log(res)})
        .catch(err => console.log(err));

         fetch(`${import.meta.env.VITE_API_URL}/doesfollow/${userid}/${id}`)
        .then(data => data.json())
        .then(res => {setfollow(res); 
                      console.log(res)})
        .catch(err => console.log(err));
    },[id])
     function handlefollow(id)
    {
      if(follow)
      {
         fetch(`${import.meta.env.VITE_API_URL}/unfollow/${userid}/${id}`
          ,{method:"DELETE"}
         ) .then(()=>{
            setfollow(false);
        })
        .catch(err=>console.log(err));
      }
      else
      {
          fetch(`${import.meta.env.VITE_API_URL}/follow/${userid}/${id}`,{method:"POST"})
           .then(()=>{
            setfollow(true);
        })
        .catch(err=>console.log(err));
      }
    }
         function handlelike(videoid)
{
    console.log(videoid);
    let userid=localStorage.getItem("userId")
fetch(`${import.meta.env.VITE_API_URL}/like/${userid}/${videoid}`,
{
method:"POST"
}
)
.then(
res=>res.json()
)
.then(newState=>{

setVideos(
videos.map(v=>

v.videoId===videoid

?

{
...v,
liked:newState
}

:

v

)

)

})

.catch(err=>console.log(err))
}

  return (
    <>
     <div className='pros'>
        <img src={Profi.profile_photo} alt="dummy"  className='ppc rounded-circle' />
        <h1 className='prnames'>{Profi.username}</h1>
        {
            userid !== id &&
            (
            <button
            className='user-follow'
            onClick={()=>handlefollow(id)}
            >
            {
            follow
            ?
            "Following"
            :
            "+ Follow"
            }
            </button>
            )
        }
    </div>
     <div className='achs'>
        <div className='achn'>
            <h3>current streak</h3>
            <h3>Achievements</h3>
            <h3>Badges</h3>
        </div>

        <div className='achd'>
            <h3>current streak-1</h3>
            <h3>Achievements-1</h3>
            <h3>Badges-1</h3>
        </div>
    </div>
     <div className='vide'>
          {videos.length>0?(
        
            <div className='vide'>
                {videos.map((vi)=>(
                    <div key={vi.id}  className='vide' >
                        <div className='fc'>
                        <h5 className='video-title'>{vi.title}</h5>
                        <video className="usp-video" muted controls controlsList='nodownload'  >
                             <source src={vi.video_path}/> 
                        </video>
                         <div className='ls d-flex'>
                          <span className='likebutton' onClick={()=>handlelike(vi.videoId)}>{vi.liked? "❤️":"🤍" }</span>
                         <h6 className='likcount'>{vi.likesCount}</h6>
                            <h6 className='video-description'>Description:{vi.description}</h6>
                         </div>
                    </div>
                 </div>

                
                ))}
            </div>
          
        ):
        (<div>No videos</div>)}
        </div>
    </>
  )
}

export default UserProfile
