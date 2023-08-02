import {Link} from 'react-router-dom';
const Likes=()=>{
    return (
        <Link to='likes-page'><button className='button'>Liked movies</button></Link>
    );
}
export default Likes;