import prevImage from '../images/previous.png';
import nextImage from '../images/next.png';
import './PrevNextPage.css';

const PrevNextPage = (props) => {
  const prevPageHandler = () => {
    if (props.page > 1) props.setPage(props.page - 1);
  };
  const nextPageHandler = () => {
    props.setPage(props.page + 1);
  };
  return (
    <div className="previous_next_page">
      <button
        type="button"
        className="page-nav-btn prev"
        onClick={prevPageHandler}
        disabled={props.page <= 1}
      >
        <img src={prevImage} alt="Previous" />
        <span>Previous</span>
      </button>
      <span className="page-number">Page {props.page}</span>
      <button
        type="button"
        className="page-nav-btn next"
        onClick={nextPageHandler}
      >
        <span>Next</span>
        <img src={nextImage} alt="Next" />
      </button>
    </div>
  );
};
export default PrevNextPage;