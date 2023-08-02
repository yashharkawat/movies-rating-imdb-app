import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';

const MoviesEdit=()=>{

    const params=useParams();
    const [movieDescription,setMovieDescription]=useState([]);
    const [inputValue,setInputValue]=useState('');

    useEffect(()=>{
        for(let key in localStorage){
            const value=JSON.parse(localStorage.getItem(key));
            if(Array.isArray(value)){
                value.forEach((item)=>{
                    if(item.imdbID===params.id){
                        setMovieDescription({title:item.Title,image:item.Poster,id:item.imdbID});
                        setInputValue(item.Title);
                    }
                })
            }
        }
        
    },[params.id])

    if(movieDescription.length===0){
        return <>
        <div>Loading</div>
        </>
    }
    const changeHandler=(e)=>{
        setInputValue(e.target.value);
    }
    const clickHandler=()=>{
        for(let key in localStorage){
            let value=JSON.parse(localStorage.getItem(key));
            if(Array.isArray(value)){
                value.forEach((item)=>{
                    if(item.imdbID===movieDescription.id){
                        item.Title=inputValue;
                    }
                    //console.log(value);
                })
                localStorage.setItem(key,JSON.stringify(value));
            }
        }
    }

    return(
        <div className='edit'>
            <div>
                <img src={movieDescription.image}/><br /><br/>
                <input type='text' className='search' onChange={changeHandler} placeholder="change title" value={inputValue}/> 
                <button onClick={clickHandler} className="button">Apply changes</button>
            </div>
            <br />
            <Link to='/'><button className='button'>Home</button></Link>
            
        </div>
    )
}
export default MoviesEdit;