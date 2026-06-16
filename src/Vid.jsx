import React, { useEffect, useState } from 'react'

function Vid() {
  const [showupload,setshowupload]=useState(false)
 const [category, setcategory] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");
  const[videos,setVideos]=useState([]);

useEffect(() => {
   let userid=localStorage.getItem("userId");
    fetch(`${import.meta.env.VITE_API_URL}/category`)
        .then(data => data.json())
        .then(res => setcategory(res))
        .catch(err => console.log(err));
        fetch(`${import.meta.env.VITE_API_URL}/uservideos/${userid}`)
        .then(data => data.json())
        .then(res => {setVideos(res); 
                      console.log(res)})
        .catch(err => console.log(err));
}, []);
  function handleclick()
  {
    setshowupload(!showupload)
  }
  const formdata=new FormData();
  function submitclick()
  {
    let videofile=document.getElementById("videofile");
    let title=document.getElementById("title");
    let description=document.getElementById("description");
    let userid=localStorage.getItem("userId");
    formdata.append("file",videofile.files[0]);
   formdata.append("title",title.value);
   formdata.append("description",description.value);
   formdata.append("categoryid",selectedCategory);
    fetch(`${import.meta.env.VITE_API_URL}/upload-video/${userid}`, {
        method: "POST",
        body: formdata
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
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
    <div className='vi'>
        <div className='up'>
          <h1>Uploads</h1>
          <button className='add' onClick={handleclick}>+</button>
        </div>
       {showupload&&(
        <div className='upload-section'>
            <h4 className='h'>select the video for upload</h4>
            <input className='i' type="file"  accept='video/*' id='videofile'/>
             <h4 className='h'> Add title for the video</h4>
            <input type="text" className='i' id='title'/>
             <h4 className='h'>Add descritption for the video</h4>
            <input type="text" className='i' id='description'/>
           <select className='s' onChange={(e) => setSelectedCategory(e.target.value)}>
            {
                category.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.cat_name}
                    </option>
                ))
            }
            </select>
            <button onClick={submitclick}>submit</button>

          </div>)}
        <div className='vide'>
          {videos.length>0?(
        
            <div className='vide'>
                {videos.map((vi)=>(
                    <div key={vi.id}  className='vide' >
                        <div className='fc'>
                        <h5 className='video-title'>{vi.title}</h5>
                        <video className="usp-video" muted controls controlsList='nodownload'  >
                             <source src={`${import.meta.env.VITE_API_URL}/usersvideos/${vi.video_path}`}/> 
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
    </div>
    <div className='empty'></div>
    </>
  )
}

export default Vid