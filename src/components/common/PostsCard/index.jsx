import { useState, useEffect, useCallback } from "react";
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
  deletePost,
  getConnections,
} from "../../../api/FireStoreAPI";
import { AiTwotoneLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import EditModal from "../EditModal";
import PostPicture from "../PostPictureModal";

function PostsCard({ post, id }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const commentsCount = comments.length;

  const toggleReadMore = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleLike = useCallback(() => {
    likePost(currentUser?.id, post.postID, isLiked);
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  }, [currentUser?.id, post.postID, isLiked]);

  useEffect(() => {
    getConnections(currentUser.id, post.userID, setIsConnected);
  }, [post.userID, currentUser.id]);

  useEffect(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      getLikesByUser(currentUser.id, post.postID, setIsLiked, setLikesCount);
    }
  }, [currentUser.id, post.postID]);

  useEffect(() => {
    const fetchComments = async () => {
      await getComments(post.postID, setComments);
    };

    fetchComments();
  }, [post.postID]);

  const handlePostImage = useCallback(() => {
    const user = allUsers.find((user) => user.id === post.userID);
    return user ? user.imageLink : userIcon;
  }, [allUsers, post.userID]);

  const handleCommentImage = useCallback(
    (commentName) => {
      const user = allUsers.find((user) => user.name === commentName);
      return user ? user.imageLink : userIcon;
    },
    [allUsers]
  );

  const handleCommentBtn = useCallback(() => {
    setIsComment((prev) => !prev);
  }, []);

  const getComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const addComment = useCallback(() => {
    if (!comment.trim()) return;
    postComment(
      post.postID,
      comment,
      getCurrentTimeStamp("LLL"),
      currentUser?.name,
      currentUser.email,
      currentUser.id
    );
    setComment("");
  }, [comment, currentUser?.name, post.postID]);

  const handleDeletePost = useCallback(() => {
    deletePost(post.id);
  }, [post.postID]);

  return (
    <>
      {isConnected || post.userID === currentUser.id ? (
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
                {allUsers.find((user) => user.id === post.userID)?.name}
              </p>
              <p className="headline">
                {allUsers.filter((user) => user.id === post.userID)[0].headline}
              </p>
              <p className="timestamp">{post.postTime}</p>
            </div>
            {currentUser.id === post.userID && (
              <div className="edit-delete-btns">
                <EditModal post={post} />
                <MdDeleteOutline
                  className="delete-btn"
                  onClick={handleDeletePost}
                />
              </div>
            )}
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
            <PostPicture post={post} />
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
                      <img src={handleCommentImage(comment.name)} alt="user" />
                      <div className="comment-card">
                        <div className="comment-info">
                          <p
                            className="comment-name"
                            onClick={() => {
                              navigate("/profile", {
                                state: {
                                  id: comment?.userID,
                                  email: comment?.userEmail,
                                },
                              });
                            }}
                          >
                            {comment.name}
                          </p>
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
      ) : null}
    </>
  );
}

export default PostsCard;
