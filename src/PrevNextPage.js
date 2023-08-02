
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
                <img src="previous.png"/>
                <div>Previous Page</div>
            </div>
            <div class="next" onClick={nextPageHandler}>
                <div>Next Page</div>
                <img src="next.png" />
            </div>
        </div>
    );
}
export default PrevNextPage;