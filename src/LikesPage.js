import Movie from "./Movie";
import {useEffect, useState} from 'react';
import {Link } from 'react-router-dom';

const LikesPage=()=>{
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
       
        for(let key in localStorage){
            let value=JSON.parse(localStorage.getItem(key));
            if(Array.isArray(value)){
                const newMovies=value.filter(item=>item.like);
                setMovies(prev=>{
                    return [...prev,...newMovies];
                });
            }
        }
        
    },[localStorage])

    const likeHandler=(isLiked,id)=>{
        for(let key in localStorage){
            
            let value=JSON.parse(localStorage.getItem(key));
            if(Array.isArray(value)){
                value.forEach(item=>{
                    if(item.imdbID===id){
                        item.like=isLiked;
                    }
                })
                localStorage.setItem(key,JSON.stringify(value));
            }
        }
    }
    return (
        <div >
            <h2 style={{textAlign:'center'}}>Liked Movies</h2>
            <div className="container" >
                {movies.map(item=><Movie id={item.imdbID} title={item.Title} image={item.Poster} liked={likeHandler} like={item.like}/>)}
            </div>
            <Link to='/'><button className='button'>Home</button></Link>
        </div>
    );
}
export default LikesPage;