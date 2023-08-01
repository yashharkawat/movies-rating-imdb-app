import { useParams,Link } from "react-router-dom";
import {useState,useEffect} from 'react';
const Likes=()=>{

    const params=useParams();
    
    const [movieTitle,setMovieTitle]=useState('');
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        async function get_description(id) {
            setLoading(true);
            const data_request = "https://www.omdbapi.com/?apikey=f2261eb2&";
            const url = `${data_request}i=${id}`;
            const request = await fetch(url);
            
            const data = await request.json();
            //console.log(data);
            setMovieTitle(data.Title);
            setLoading(false);
        }
        get_description(params.id);
        
    },[params.id])

    return (<>
       {loading &&<h2>Movie name</h2>}
        {!loading && <h2>{movieTitle}</h2>}
        <p>Rate the movie:</p>
        <label>
            <input type="radio" name="movie_rating" value="1" />
            1
        </label>
        <label>
            <input type="radio" name="movie_rating" value="2" />
            2
        </label>
        <label>
            <input type="radio" name="movie_rating" value="3" />
            3
        </label>
        <label>
            <input type="radio" name="movie_rating" value="4" />
            4
        </label>
        <label>
            <input type="radio" name="movie_rating" value="5" />
            5
        </label>
        <br /><br />

        <Link to='/'>
            <button type='submit'>Submit rating</button>
        </Link>
    </>
    );
}
export default Likes;