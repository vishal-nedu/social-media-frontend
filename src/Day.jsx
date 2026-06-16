import React from 'react'
import Titlebar from './Titlebar'
import Tabs from './Tabs'
import QOTD from './QOTD'
import TOTD from './TOTD'
function Day() {
  if(!localStorage.getItem("userId"))
  {
    return  null;
  }
  return (
      <div className="main ">
      <div><Titlebar/></div>
      <div className='qtd'><QOTD/></div>
      {/* <div className='ttd'><TOTD/></div> */}
      <div className="tabs"><Tabs/></div>
      </div>
  )
}

export default Day