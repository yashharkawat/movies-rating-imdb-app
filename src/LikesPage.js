import Movie from "./Movie";
import {useEffect, useState} from 'react';
const LikesPage=()=>{
    
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        
    if('likedMovies' in localStorage) setMovies(JSON.parse(localStorage.getItem('likedMovies')));
    },[])
    return (<>
        {movies.map(item=><Movie id={item.id} title={item.title} image={item.image}/>)}
    </>);
}
export default LikesPage;