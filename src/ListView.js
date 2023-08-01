import { useEffect ,useState} from "react";
import Movie from "./Movie";
import Search from "./Search";
import Filter from "./Filter";

const ListView=()=>{
    
    const [movies,setMovies]=useState([]);
    const [page,setPage]=useState(1);
    const [searchText,setSearchText]=useState('avengers');
    const [loading,setLoading]=useState(true);
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
        console.log(movies);
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
            {filterMovies.map(item=><Movie image={item.Poster} title={item.Title} id={item.imdbID}/>) }
            </>
        );
    }

    return <>
        <Filter year={filterYearHandler}/>
        <Search moviesSearch={moviesSearchHandler} page={page}/>
        {!filter && movies.map(item=><Movie image={item.Poster} title={item.Title} id={item.imdbID}/>)  }
        {filter && <ApplyFilter />}
        <button onClick={nextPageHandler}>Next Page</button>
    </>
}
export default ListView;