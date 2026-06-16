import Category from "./Category"
import Channels from "./Channels"
import Feeds from "./Feeds"
import Tabs from "./Tabs"
import Titlebar from "./Titlebar"
import { useState } from "react"
import Register from "./Register"
import Login from "./Login"

function App() {
    const [userId, setUserId] = useState(
        localStorage.getItem("userId")
    );
    const[Page,setPage]=useState("login");

   const [selectedCategory, setSelectedCategory] = useState(null);
   if(userId!=null)
  {

 
  return (

      <div className="main ">
      <div><Titlebar/></div>
      <div className="content d-flex">
        <div className="channel "><Channels/></div>
        <div className="cate bg-secondary"><Category  selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}/></div>
        <div className="feed"><Feeds selectedCategory={selectedCategory}/></div>
      </div>
      <div className="tabs"><Tabs/></div>
      </div>
  )
} 
  // const userId=localStorage.getItem("userId");
  if(Page==="Register")
  {
    return <Register  setPage={setPage} />
  }
  return <Login setUserId={setUserId} setPage={setPage}/>
 
}

export default App
