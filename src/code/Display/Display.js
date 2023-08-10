import { useEffect, useState } from "react";
import Movie from "../Movie";
import Search from "../search/Search";
import Filter from "../Filter";
import "./Display.css";
import PrevNextPage from "../PrevNextPage";
import Likes from "../Likes";
import { collection, updateDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/index";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("avengers");
  const [filterYear, setFilterYear] = useState(0);
  const [filter, setFilter] = useState(false);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getRating(id) {
      const data_request = "https://www.omdbapi.com/?apikey=f2261eb2&";
      const url = `${data_request}i=${id}`;
      const request = await fetch(url);
      const data = await request.json();
      //console.log(data);

      return data;
    }
    async function fetchData() {
      const data_request = "https://www.omdbapi.com/?apikey=f2261eb2&";
      const url = `${data_request}s=${searchText}&page=${page}`;
      const request = await fetch(url);
      const data = await request.json();

      if (data.Error) {
        setError(true);
        setMovies([]);
      } else {
        //const imdbRating=await getRating(id);
        //console.log(imdbRating);
        const searchMovies = data.Search;
        const ratingsPromises = data.Search.map(async (movie) => {
          const rating = await getRating(movie.imdbID);
          return { ...movie, imdbRating: rating.imdbRating };
        });

        const ratings = await Promise.all(ratingsPromises);
        //console.log(ratings);
        setMovies(ratings);
      }
    }
    try {
      fetchData();
    } catch (err) {
      setError(true);
      console.log(err);
    }
  }, [searchText, page]);

  const moviesSearchHandler = (text) => {
    setSearchText(text);
    if (searchText === "") setSearchText("avengers");
    setPage(1);
  };

  const filterYearHandler = (year) => {
    setFilterYear(year);
    if (year > 0) setFilter(true);
    else setFilter(false);
  };
  const ApplyFilter = () => {
    const filterMovies = movies.filter((item) => {
      return item.Year >= filterYear;
    });
    return (
      <div className="container">
        {filterMovies.map((item) => (
          <Movie
            image={item.Poster}
            title={item.Title}
            id={item.imdbID}
            liked={likeHandler}
            unlikeHandler={unlikeHandler}
            like={
              user.liked === undefined
                ? false
                : user.liked.includes(item.imdbID)
                ? true
                : false
            }
            imdbRating={item.imdbRating}
          />
        ))}
      </div>
    );
  };
  const DisplayMovies = () => {
    return (
      <div className="container">
        {movies.map((item) => (
          <Movie
            image={item.Poster}
            title={item.Title}
            id={item.imdbID}
            liked={likeHandler}
            unlikeHandler={unlikeHandler}
            like={
              user.liked === undefined
                ? false
                : user.liked.includes(item.imdbID)
                ? true
                : false
            }
            imdbRating={item.imdbRating}
          />
        ))}
      </div>
    );
  };
  const likeHandler = async (movieId) => {
    try {
      const userRef = doc(db, "users", user.id);
      //console.log(user);
      let newLikedMovies;
      if (user.liked === undefined) {
        newLikedMovies = [movieId];
      } else {
        newLikedMovies = [movieId, ...user.liked];
      }
      dispatch(actions.changeCurrentUserLiked(newLikedMovies));
      ///console.log(user);
      const newUser = { ...user, liked: newLikedMovies };
      await updateDoc(userRef, newUser);
    } catch (err) {
      console.log(err);
    }
  };
  const unlikeHandler = async (movieId) => {
    const userRef = doc(db, "users", user.id);
    //console.log(user);
    let newLikedMovies = user.liked.filter((id) => id !== movieId);
    dispatch(actions.changeCurrentUserLiked(newLikedMovies));
    ///console.log(user);
    const newUser = { ...user, liked: newLikedMovies };
    await updateDoc(userRef, newUser);
  };
  const setPageHandler = (newPage) => {
    setPage(newPage);
  };
  return (
    <>
      <Search moviesSearch={moviesSearchHandler} page={page} />

      <div className="filter_likes">
        <Filter year={filterYearHandler} />
        {<Likes />}
      </div>
      {!filter && movies.length !== 0 && <DisplayMovies />}
      {filter && movies.length !== 0 && <ApplyFilter />}
      {movies.length === 0 && <h2>No Movies Found</h2>}
      <PrevNextPage setPage={setPageHandler} page={page} />
    </>
  );
};

export default Display;
