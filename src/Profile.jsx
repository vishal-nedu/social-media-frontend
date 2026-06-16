import React from 'react'
import Titlebar from './Titlebar'
import Tabs from './Tabs'
import Prof from './Prof'
import Achieve from './Achieve'
import Vid from './Vid'
function Profile() {
   if(!localStorage.getItem("userId"))
  {
    return  null;
  }
  return (
     <div className="main ">
      <div><Titlebar/></div>
        <div className='proft'><Prof/></div>
         <div className='ach'><Achieve/></div>
          <div className='videos'><Vid/></div>
      <div className="tabs"><Tabs/></div>
      </div>
  )
}

export default Profile