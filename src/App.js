import {
  createBrowserRouter,RouterProvider
} from "react-router-dom";
import React from 'react';
import ListView from './ListView';
import MoviesDetails from './MoviesDetails';
import Likes from './Likes'
import './App.css'
import LikesPage from "./LikesPage";

const router=createBrowserRouter([
{
  path:'/',
  element:<ListView />,
},
{
  path:'/:id',
  element:<MoviesDetails />
},
{
  path:'/likes/:id',
  element:<Likes />
},
{
  path:'/likes-page',
  element:<LikesPage />
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
