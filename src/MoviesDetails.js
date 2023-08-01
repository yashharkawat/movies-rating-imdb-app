import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import { Outlet } from "react-router-dom";
const MoviesDetails=()=>{

    const params=useParams();
    const [movieDescription,setMovieDescription]=useState([]);

    useEffect(()=>{
        async function get_description(id) {
            const data_request = "https://www.omdbapi.com/?apikey=f2261eb2&";
            const url = `${data_request}i=${id}`;
            const request = await fetch(url);
            const data = await request.json();
            setMovieDescription({details:data.Poster,title:data.Title});
        }
        get_description(params.id);
        
    },[params.id])

    if(movieDescription.length===0){
        return <>
        <div>Loading</div>
        </>
    }
    return(
        <>
            <h2>Hello movies details</h2>
            <h1>{params.id}</h1>
            <Link to='/'>
                <img src={movieDescription.details}/>
            </Link>
            <h3>{movieDescription.title}</h3>
        </>
    )
}
export default MoviesDetails;