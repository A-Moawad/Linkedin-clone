import { useMemo, useState, useEffect } from "react";
import "./index.scss";
import userIcon from "../../../assets/userIcon.jpg";
import { useNavigate } from "react-router-dom";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

import {
  getLikesByUser,
  likePost,
  getCurrentUser,
  postComment,
  getComments,
  getAllUsers,
} from "../../../api/FireStoreAPI";
import { AiTwotoneLike } from "react-icons/ai"; // empty like icon
import { BiSolidLike } from "react-icons/bi"; // full like icon
import { FaRegCommentDots } from "react-icons/fa6";
// import { getPostImage } from "../../../api/imageUploadAPI";

function PostsCard({ post, id }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  console.log(comments);
  console.log(currentUser);
  const commentsCount = comments.length;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => {
    likePost(currentUser?.id, post.postID, isLiked);
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  useMemo(() => {
    if (currentUser.id) {
      getLikesByUser(currentUser.id, post.postID, setIsLiked, setLikesCount);
    }
  }, [currentUser.id, post.postID]);

  useEffect(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);
  useEffect(() => {
    const fetchComments = async () => {
      await getComments(post.postID, setComments);
    };

    fetchComments();
  }, [post.postID]);

  const handlePostImage = () => {
    const user = allUsers.find((user) => user.id === post.userID);
    return user ? user.imageLink : userIcon;
  };

  const handleCommentBtn = () => {
    setIsComment(!isComment);
  };

  const getComment = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    if (!comment.trim()) return;
    postComment(
      post.postID,
      comment,
      getCurrentTimeStamp("LLL"),
      currentUser?.name
    );
    setComment("");

    console.log("Comment posted:", comment);
  };

  return (
    <div className="post-card" key={id}>
      <div className="post-card-info">
        <img src={handlePostImage()} alt="user" className="user-icon" />
        <div className="user-details">
          <p
            className="username"
            onClick={() =>
              navigate("/profile", {
                state: { id: post?.userID, email: post?.userEmail },
              })
            }
          >
            {post.userName}
          </p>
          <p className="timestamp">{post.postTime}</p>
        </div>
      </div>
      <div className="post-content">
        <p>
          <span className="post-text">
            {isExpanded ? post.post : `${post.post.substring(0, 200)}`}
          </span>
          {post.post.length > 200 && (
            <button onClick={toggleReadMore} className="read-more-button">
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
      </div>
      <div className="footer">
        <div className="status-bar">
          <p>
            {likesCount} person{likesCount !== 1 && "s"} liked this post
          </p>
          {commentsCount} comment{commentsCount !== 1 && "s"}
        </div>
        <div className="btns">
          <button
            className={`btn like ${isLiked ? "blue" : ""}`}
            onClick={handleLike}
          >
            {isLiked ? <BiSolidLike /> : <AiTwotoneLike />}
            <p className={isLiked ? "blue" : ""}>
              {likesCount} like{likesCount !== 1 ? "s" : ""}
            </p>
          </button>
          <button className="comment btn" onClick={handleCommentBtn}>
            <FaRegCommentDots />
            <p>comment</p>
          </button>
        </div>
        {isComment && (
          <div className="add-comment-container">
            <input
              className="comment-input common-input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={getComment}
            />
            <button className="add-comment" onClick={addComment}>
              Add comment
            </button>
            {comments.length > 0 &&
              comments.map((comment, index) => (
                <div className="comment-card-container" key={index}>
                  <img src={userIcon} alt="user" />
                  <div className="comment-card">
                    <div className="comment-info">
                      <p className="comment-name">{comment.name}</p>
                      <p className="timestamp">{comment.timeStamp}</p>
                    </div>
                    <p className="comment">{comment.comment}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsCard;
