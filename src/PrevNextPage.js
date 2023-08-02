import prevImage from './previous.png';
import nextImage from './next.png';
const PrevNextPage=(props)=>{
    const prevPageHandler=()=>{
        if(props.page>1) props.setPage(props.page-1);
    }
    const nextPageHandler=()=>{
        props.setPage(props.page+1);
        
    }
    return (
        <div class="previous_next_page">
            <div class="previous" onClick={prevPageHandler}>
                <img src={prevImage}/>
                <div>Previous Page</div>
            </div>
            <div class="next" onClick={nextPageHandler}>
                <div>Next Page</div>
                <img src={nextImage} />
            </div>
        </div>
    );
}
export default PrevNextPage;