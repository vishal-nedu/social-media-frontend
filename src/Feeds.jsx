import React, { useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Feeds({selectedCategory}) {
    const videoRefs=useRef([]);
    const[videos,setVideos]=useState([]);
    const currentvideoRef=useRef(null);
    let userid=localStorage.getItem("userId");
    // const[liked,setliked]=useState(video.liked);
    const navigate=useNavigate();
    useEffect(()=>
    {
        let url = `${import.meta.env.VITE_API_URL}/videos`;

            if(selectedCategory != null)
            {
                url += "/" + selectedCategory;
            }
            url+="/"+userid;
            fetch(url).
            then(data=>data.json())
            .then(res=>setVideos(res))
            .catch(err=>console.log(err));

    },[selectedCategory])
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
    useEffect(() => {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {
                
                const video = entry.target;

                if (entry.isIntersecting) 
                {
                    if(currentvideoRef.current&&currentvideoRef.current!==video)
                    {
                        currentvideoRef.current.pause();
                    }
                    
                    video.play();
                    video.muted=false;
                    currentvideoRef.current=video;
                }
                else {
                    video.pause();
                }

            });

        },

        {
            threshold: 0.9
        }

    );

    videoRefs.current.forEach((video) => {


        if (video) {
            observer.observe(video);
        }

    });

    return () => {

        videoRefs.current.forEach((video) => {

            if (video) {
                observer.unobserve(video);
            }

        });

    };

}, [videos]);
  return (
    <div>
        {videos.length>0?(
        
            <div className='video'>
                {videos.map((vi,index)=>(
                    <div key={vi.videoId} >
                        {/* <h2>{vi.video_name}</h2> */}
                        <div className='fc'>
                        <div className='video-header' onClick={()=>navigate(`/userprofile/${vi.userId}`)}>
                            <img src={vi.profile_photo} className='pfpc rounded-circle'  alt="user-profile" />
                            <h2>{vi.username}</h2>
                        </div>
                        <h5 className='video-title'>{vi.title}</h5>
                        <video className="feed-video"  ref={(el)=>(videoRefs.current[index]=el)} muted controls controlsList='nodownload'  >
                             <source src={vi.video_path}/> 
                        </video>
                         <div className='ls d-flex'>
                         <span className='likebutton' onClick={()=>handlelike(vi.videoId)}>{vi.liked? "❤️":"🤍" }</span>
                         <h6 className='likcount'>{vi.likesCount}</h6>
                            <h6 className='video-description'>Description:{vi.description}</h6>
                         </div>
                         {/* <div className='com bg-primary'>
                            <div className='d-flex'> <i className="bi bi-heart"></i><h6>12</h6>
                            <i className=" se bi bi-send"></i></div>
                            <div>Comments</div> */}
                         {/* </div>  */}
                         </div>
                    </div>

                
                ))}
               
              
            </div>
        ):
        (<div>Loading</div>)}
    </div>
  )
}

export default Feeds
