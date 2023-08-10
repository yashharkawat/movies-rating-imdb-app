import {
  createBrowserRouter,RouterProvider
} from "react-router-dom";
import React from 'react';
import MoviesEdit from '../MoviesEdit';
import './App.css'
import LikesPage from "../LikesPage";
import Display from "../Display/Display";
import Login from "../users/Login";
import SignUp from "../users/SignUp";
import ProfilePage from "../Profile/ProfilePage";
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
  path:'/:id',
  element:<MoviesEdit />
},
{
  path:'/likes-page',
  element:<LikesPage />
},
{
  path:'/profile',
  element:<ProfilePage />
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
