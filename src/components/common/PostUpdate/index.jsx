import "./index.scss";
import { useState, useEffect } from "react";
import {
  postStatus,
  getStatus,
  getConnections,
} from "../../../api/FireStoreAPI";
import ModalComponent from "../Modal/index";
import userIcon from "../../../assets/userIcon.jpg";
import PostsCard from "../PostsCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueID } from "../../../helpers/getUniqueId";
import { getPostImage } from "../../../api/imageUploadAPI";

function PostStatus({ currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [postImage, setPostImage] = useState("");
  const [postPicture, setPostPicture] = useState("");

  const userEmail = localStorage.getItem("userEmail");
  console.log(postPicture);

  const sendPost = async () => {
    const object = {
      post: post,
      userEmail: userEmail,
      postTime: getCurrentTimeStamp("LLL"),
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
      postPicture: postPicture,
    };
    try {
      await postStatus(object);
      setShowModal(false);
      setPost("");
      getStatus(setAllPosts);
    } catch (error) {
      console.error("Error posting status:", error);
    }
  };

  useEffect(() => {
    getStatus(setAllPosts);
  }, []);

  const updatePost = () => {
    setIsEdit(false);
    setPost("");
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className="post-status-main">
      <div className="post-status">
        <img className="userIcon" src={currentUser.imageLink} alt="user" />
        <button className="open-post-modal" onClick={handleShowModal}>
          Start a post, try writing with AI
        </button>
      </div>
      <ModalComponent
        modalOpen={showModal}
        setModalOpen={setShowModal}
        post={post}
        setPost={setPost}
        sendPost={sendPost}
        isEdit={isEdit}
        postImage={postImage}
        setPostImage={setPostImage}
        updatePost={updatePost}
        getPostImage={getPostImage}
        postPicture={postPicture}
        setPostPicture={setPostPicture}
      />
      <div className="all-posts">
        {allPosts?.map((post) => (
          <div key={post.id}>
            <PostsCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostStatus;
