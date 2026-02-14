import Movie from "./Movie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/index";
import { db } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import "./Display/Display.css";
import "./LikesPage.css";
const LikesPage = () => {
  const [movies, setMovies] = useState([]);
  const likedMoviesId = useSelector((state) => state.liked);
  const [loading, setLoading] = useState(false);
  const user=useSelector(state=>state);
  const dispatch=useDispatch();
  const [like,setLike]=useState(true);
  useEffect(() => {
    setLoading(true);
    const getData = async (id) => {
     // console.log(id);
      const data_request = "https://www.omdbapi.com/?apikey=f2261eb2&";
      const url = `${data_request}i=${id}`;
      const request = await fetch(url);
      const data = await request.json();
      //console.log(data);

      return data;
    };
    const getMovies=async()=>{
      const likedPromises = likedMoviesId.map(async (id) => {
        const rating = await getData(id);
        return rating;
      });
      
      const liked = await Promise.all(likedPromises);
      //console.log(likedMoviesId);
      setMovies(liked);
    }
    getMovies();
    setLoading(false);
  }, [likedMoviesId]);

  const likeHandler = async (movieId) => {
    //setLike(true);
    const userRef = doc(db, "users", user.id);
    //console.log(user);
    let newLikedMovies;
    if(user.liked===undefined){
      newLikedMovies = [movieId];
    }
    else{
      newLikedMovies = [movieId, ...user.liked];
    }
    dispatch(actions.changeCurrentUserLiked(newLikedMovies));
    ///console.log(user);
    const newUser = { ...user, liked: newLikedMovies };
    await updateDoc(userRef, newUser);
  };
  const unlikeHandler = async (movieId) => {
    //setLike(false);
    const userRef = doc(db, "users", user.id);
    //console.log(user);
    let newLikedMovies=user.liked.filter((id)=>id!==movieId);
    dispatch(actions.changeCurrentUserLiked(newLikedMovies));
    ///console.log(user);
    const newUser = { ...user, liked: newLikedMovies };
    await updateDoc(userRef, newUser);
    
  };
  return (
    <div className="likes-page">
      <header className="likes-page-header">
        <Link to="/movies" className="likes-page-home-link">← Back to search</Link>
        <h1 className="likes-page-title">Liked Movies</h1>
      </header>
      {movies.length === 0 && !loading && (
        <p className="likes-page-empty">You haven't liked any movies yet. Search and like some from the home page.</p>
      )}
      <div className="container">
        {movies.map((item) => (
          <Movie
            key={item.imdbID}
            id={item.imdbID}
            title={item.Title}
            image={item.Poster}
            liked={likeHandler}
            unlikeHandler={unlikeHandler}
            like={true}
            imdbRating={item.imdbRating}
            likesPage={true}
          />
        ))}
      </div>
    </div>
  );
};
export default LikesPage;
