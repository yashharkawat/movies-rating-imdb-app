import "./ProfilePage.css";
import {  useSelector } from "react-redux";

const ProfilePage = () => {
  const user=useSelector(state=>state);
  return (
    <div className="profile-container">
      <h1 className="heading">Welcome, {user.name}</h1>
      <div>
        <p className="paragraph">Email: {user.email}</p>
        
      </div>
    </div>
  );
};

export default ProfilePage;
