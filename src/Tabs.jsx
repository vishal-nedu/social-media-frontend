import React from 'react'
import {useNavigate} from 'react-router-dom'

function Tabs() {
  const navigate=useNavigate();
  return (
    <div className='tb d-flex'>
       <div style={{ cursor:"pointer"}} onClick={()=>{navigate('/')}}>Feeds</div>
       <div style={{ cursor:"pointer"}} onClick={()=>{navigate('/Search')}}>search</div>
       <div style={{ cursor:"pointer"}} onClick={()=>{navigate('/Day')}}>Day</div>
       {/* <div style={{ cursor:"pointer"}} onClick={()=>{navigate('/LikedVideos')}}>Liked Videos</div> */}
       <div style={{ cursor:"pointer"}} onClick={()=>{navigate('/Profile')}}>Profile</div>

    </div>
  )
}

export default Tabs