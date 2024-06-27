import "../Sass/HomeComponent.scss";
import PostStatus from "./common/PostUpdate";
import "../Sass/HomeComponent.scss";
import { useNavigate } from "react-router-dom";
function HomeComponent({ currentUser }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile", {
      state: {
        id: currentUser?.id,
      },
    });
  };
  return (
    <div className="home-main">
      <div className="home-profile-card">
        <img src={currentUser.imageLink} />
        <h3 className="username" onClick={handleClick}>
          {currentUser.name}
        </h3>
        <p className="headline">{currentUser.headline}</p>
      </div>
      <PostStatus currentUser={currentUser} />
    </div>
  );
}

export default HomeComponent;
