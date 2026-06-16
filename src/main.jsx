import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// import LongVideo from './LongVideo.jsx'
import Day from './Day.jsx'
import Profile from './Profile.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Search from './Search.jsx'
import UserProfile from './UserProfile.jsx'
// import LikedVideos from './LikedVideos.jsx'
const router=createBrowserRouter(
  [
     {
      path:'/',
      element:<App/>
    },
    // {
    //   path:'/LongVideo',
    //   element:<LongVideo/>
    // },
    {
      path:'/Day',
      element:<Day/>
    },
    {
      path:'/Profile',
      element:<Profile/>
    }
    ,{
      path:'/search',
      element:<Search/>
    }
    ,{
      path:'/userprofile/:id',
      element:<UserProfile/>
    }
    // ,{
    //   path:'/LikedVideos',
    //   element:<LikedVideos/>
    // }
    // {

    //   path:'/Register',
    //   element:<Register/>
    // },
    // {
    //   path:'/Login',
    //   element:<Login/>
    // }
  ])
createRoot(document.getElementById('root')).render(
   <RouterProvider router=
    {router} />
)
