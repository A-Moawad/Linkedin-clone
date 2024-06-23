import "../Sass/HomeComponent.scss";
import PostStatus from "./common/PostUpdate";
import "../Sass/HomeComponent.scss";
function HomeComponent({currentUser}) {
  return (
    <div className="home-main">
      <PostStatus currentUser={currentUser}/>
    </div>
  );
}

export default HomeComponent;
