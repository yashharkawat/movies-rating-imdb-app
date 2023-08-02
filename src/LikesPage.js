import Movie from "./Movie";
import {useEffect, useState} from 'react';
import {Link } from 'react-router-dom';

const LikesPage=()=>{
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        if('likedMovies' in localStorage) setMovies(JSON.parse(localStorage.getItem('likedMovies')));
    },[])
    
    return (
        <>
            <h2 style={{textAlign:'center'}}>Liked Movies</h2>
            <div className="container">
                {movies.map(item=><Movie id={item.id} title={item.title} image={item.image} like={true} />)}
            </div>
            <Link to='/'>Back to Homepage</Link>
        </>
    );
}
export default LikesPage;