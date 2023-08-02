import { useEffect ,useState} from "react";
import Movie from "./Movie";
import Search from "./Search";
import Filter from "./Filter";
import './Display.css'
import PrevNextPage from "./PrevNextPage";
import Likes from "./Likes";

const Display=()=>{
    const [movies,setMovies]=useState([]);
    const [page,setPage]=useState(1);
    const [searchText,setSearchText]=useState('avengers');
    const [filterYear,setFilterYear]=useState(0);
    const [filter,setFilter]=useState(false);
    const [error,setError]=useState(false);

    useEffect( ()=>{

        const timer=setTimeout(()=>{
            async function fetchData(index){
                const data_request = "https://www.omdbapi.com/?apikey=f2261eb2&";
                const url = `${data_request}s=${searchText}&page=${index}`;
                const request = await fetch(url);
                const data = await request.json();
                
                if(data.Error) {
                    setError(true);
                    setMovies([]);
                }
                else{
                    setError(false);
                    const searchMovies = data.Search;
                    localStorage.setItem(`search${searchText}page${index}`,JSON.stringify(searchMovies));
                    if(page===index) setMovies(searchMovies);
                }
                
            }
            if(`search${searchText}page${page}` in localStorage) {
                setMovies(JSON.parse(localStorage.getItem(`search${searchText}page${page}`)));
                
            }
            else fetchData(page);
            if(`search${searchText}page${page+1}` in localStorage) {}
            else fetchData(page+1);
            if(`search${searchText}page${page+2}` in localStorage) {}
            else fetchData(page+2);
   
        },500)
        return ()=>{
            clearTimeout(timer);
        }
        
    },[searchText,page])
    
    const moviesSearchHandler=(text)=>{
        setSearchText(text);
        if(searchText==='') setSearchText('avengers');
        setPage(1);
    }
    
    const filterYearHandler=(year)=>{
        setFilterYear(year);
        if(year>0) setFilter(true);
        else setFilter(false);
        
    }
    const ApplyFilter=()=>{
        const filterMovies=movies.filter((item)=>{
            return item.Year==(filterYear);
        })
        return (
            <>
            {filterMovies.map(item=><Movie image={item.Poster} title={item.Title} id={item.imdbID} liked={likeHandler} like={item.like?true:false} />) }
            </>
        );
    }
    const DisplayMovies=()=>{
        return (
            <div className='container'>
                {movies.map(item=><Movie image={item.Poster} title={item.Title} id={item.imdbID} liked={likeHandler} like={item.like?true:false} />) }
            </div>
        );
    }
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
    const setPageHandler=(newPage)=>{
        setPage(newPage);
    }
    return <>
        
        <Search moviesSearch={moviesSearchHandler} page={page}/>
        <div className="filter_likes"> 
            <Filter year={filterYearHandler}/>
            {<Likes />}
        </div>
        {!filter && movies.length!==0 && <DisplayMovies />}
        {filter && movies.length!==0 &&<ApplyFilter />}
        {movies.length===0 && <h2>No Movies Found</h2>}
        <PrevNextPage setPage={setPageHandler} page={page}/>
        
    </>
}

export default Display;