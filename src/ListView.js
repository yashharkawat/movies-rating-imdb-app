import { useEffect ,useState} from "react";
import Movie from "./Movie";
import Search from "./Search";
import Filter from "./Filter";
import {Link} from 'react-router-dom';
import './ListView.css'


const ListView=()=>{
    
    const [movies,setMovies]=useState([]);
    const [page,setPage]=useState(1);
    const [searchText,setSearchText]=useState('avengers');
    const [loading,setLoading]=useState(false);
    const [filterYear,setFilterYear]=useState(0);
    const [filter,setFilter]=useState(false);

    useEffect( ()=>{

        const timer=setTimeout(()=>{
            async function fetchData(index){
                setLoading(true);
                const data_request = "https://www.omdbapi.com/?apikey=f2261eb2&";
                const url = `${data_request}s=${searchText}&page=${index}`;
                //console.log(url);
                const request = await fetch(url);
                const data = await request.json();
                
                const searchMovies = data.Search;
                localStorage.setItem(`search${searchText}page${index}`,JSON.stringify(searchMovies));
                if(page===index) setMovies(searchMovies);
                setLoading(false);
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
    const nextPageHandler=()=>{
        console.log(page);
        setPage(prev=>prev+1);
        
    }

    const filterYearHandler=(year)=>{
        //console.log(movies);
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
    const prevPageHandler=()=>{
        if(page>1) setPage(page-1);
    }
    const PrevNextPage=()=>{
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
    const Likes=()=>{
        return (
            <Link to='likes-page'><button>Liked movies</button></Link>
        );
    }
    const likeHandler=(isLiked,id)=>{
        console.log(isLiked,id);
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
    const loadingHandler=(isLoading)=>{
        setLoading(isLoading);
    }

    return <>
        
        <Search moviesSearch={moviesSearchHandler} page={page}/>
        <div className="filter_likes"> 
            <Filter year={filterYearHandler}/>
            {!loading && <Likes />}
        </div>
        {!filter &&  <DisplayMovies />}
        {filter && <ApplyFilter />}
        <PrevNextPage />
        
    </>
}
export default ListView;