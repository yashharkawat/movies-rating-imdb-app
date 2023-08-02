import {
  createBrowserRouter,RouterProvider
} from "react-router-dom";
import React from 'react';
import MoviesEdit from './MoviesEdit';
import './App.css'
import LikesPage from "./LikesPage";
import Display from "./Display";

const router=createBrowserRouter([
{
  path:'/',
  element:<Display />,
},
{
  path:'/:id',
  element:<MoviesEdit />
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
