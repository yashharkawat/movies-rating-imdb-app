import React, { useEffect, useState } from "react";
import "./Description.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DescriptionPage = () => {
  const [movieData, setMovieData] = useState({});
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const params = useParams();
  useEffect(() => {
    description(params.id);
  }, []);

  const data_request = "https://www.omdbapi.com/?apikey=f2261eb2&";

  const description = async (id) => {
    const url = `${data_request}i=${id}`;
    const request = await fetch(url);
    const data = await request.json();
    setMovieData(data);
  };

  return (
    <div>
      <div className="name">
        <div className="title">
          <h2>{movieData.Title}</h2>
        </div>
        <div className="time">
          <div>{movieData.DVD?.split(" ")[2]}</div>
          <div>{movieData.Rated}</div>
          <div>{movieData.Runtime}</div>
        </div>
        <div className="imdb_rating">
          <div>IMDB Rating</div>
          <div>{movieData.imdbRating}</div>
        </div>
      </div>

      <div className="description">
        <div className="image">
          <img src={movieData.Poster} alt="Movie Poster" />
        </div>
        <div className="details">
          <div>{movieData.Plot}</div>
          <br />
          <div className="genre">Genre: {movieData.Genre}</div>
          <br />
          <div className="awards">Awards: {movieData.Awards}</div>
          <br />
          <div className="actors">Actors: {movieData.Actors}</div>
          <br />
          <div className="writer">Writer: {movieData.Writer}</div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
