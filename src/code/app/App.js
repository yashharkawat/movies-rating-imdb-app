import {
  createBrowserRouter,RouterProvider
} from "react-router-dom";
import React from 'react';
import './App.css'
import LikesPage from "../LikesPage";
import Display from "../Display/Display";
import Login from "../users/Login";
import SignUp from "../users/SignUp";
import ProfilePage from "../Profile/ProfilePage";
import DescriptionPage from "../Description/Description";
const router=createBrowserRouter([
{
  path:'/',
  element:<Display />,
},
{
  path:'/login',
  element:<Login />,
},
{
  path:'/sign-up',
  element:<SignUp />,
},
{
  path:'/likes-page',
  element:<LikesPage />
},
{
  path:'/profile',
  element:<ProfilePage />
},
{
  path:'/description/:id',
  element:<DescriptionPage />
}
])

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  
  );
}

export default App;
