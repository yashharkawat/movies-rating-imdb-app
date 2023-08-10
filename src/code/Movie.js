import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Movie = (props) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.id);
  const [like, setLike] = useState(props.like);
  const clickHandler = () => {
    props.liked(props.id);
    setLike(true);
    onLikeClicked();
  };
  const unlikeHandler = () => {
    props.unlikeHandler(props.id);
    setLike(false);
  };
  const onLikeClicked = () => {
    if (userId === "") {
      //
      navigate("/sign-up");
    }
  };
  return (
    <div key={props.id} id={props.id} className="movies">
      <Link to={`/${props.id}`}>
        <img className="movie_poster" src={props.image} />
      </Link>
      <div className="movie_description">
        <div>
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            class="ipc-icon ipc-icon--star-inline"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="presentation"
          >
            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
          </svg>
          <span>{props.imdbRating}</span>
        </div>
        {!like && (
          <svg
            className="movie_like"
            onClick={clickHandler}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="presentation"
          >
            <path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.510l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.810.45-2.348-.785-2.446zm-10.726 8.890l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z"></path>
          </svg>
        )}
        {like && (
          <svg
            className="movie_like"
            onClick={unlikeHandler}
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="presentation"
          >
            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
          </svg>
        )}
      </div>
      <div className="movie_name">{props.title}</div>
    </div>
  );
};
export default Movie;
