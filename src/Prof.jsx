import React, { useEffect, useState } from 'react'

function Prof() {
  const [file, setFile] = useState(null);
  const[Profi,setProfile]=useState({
    username:"",
    age:"",
    profile_photo:""
});
function uploadprofile()
{
   const userid=localStorage.getItem("userId");
  const formData=new FormData();
  let selectedfile=document.getElementById('selectedfile');
  formData.append("file",selectedfile.files[0]);
     fetch(`${import.meta.env.VITE_API_URL}/upload-profile/` + userid, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        setProfile(data);
        console.log("Profile updated");
    })
    .catch(err => console.log(err));

}
  const userid=localStorage.getItem("userId");
  console.log(userid);
  useEffect(()=>{
    let url=`${import.meta.env.VITE_API_URL}/user/`+userid
    fetch(url).
   then(data=>data.json())
  .then(res=>{setProfile(res)
    console.log(res.profile_photo);
  })
  .catch(err=>console.log(err));
},[])
  return (
    <>
    <div className='pro'>
        <img src={`${Profi.profile_photo}`} alt="dummy"  className='ppc rounded-circle' />
       <input type="file" accept="image/*" className='profi'id='selectedfile' onChange={(e) => setFile(e.target.files[0])}/>
        <button className='profb' onClick={uploadprofile} >Add/change profile photo</button>
        <h1 className='prname'>{Profi.username}</h1>
         {/* <h2 className='gr'>{Profi.age}</h2> */}
    </div>
   </> 

  )
}
//${import.meta.env.VITE_API_URL}/profile-images/
export default Prof
