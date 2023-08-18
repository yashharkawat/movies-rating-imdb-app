import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { actions } from '../store';
const Likes=()=>{
    const dispatch=useDispatch();
    const logoutHandler = async () => {
        try {
          dispatch(actions.changeCurrentUser("reset"));
          await signOut(auth);
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <div className='like-logout'>
            
        <Link to='likes-page'><button className='likes-button'>Liked movies</button></Link>
        <button className="logout-button-mobile" onClick={logoutHandler}>Logout</button>
        </div>
        );
}
export default Likes;