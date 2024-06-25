import { toast } from "react-toastify";
import { firestore } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";

// Reference to the "posts" collection in Firestore
const postsRef = collection(firestore, "posts");
const userRef = collection(firestore, "users");
const likeRef = collection(firestore, "likes");
const commentsRef = collection(firestore, "comments");
const connectionsRef = collection(firestore, "connections");

export const postStatus = async (object) => {
  try {
    await addDoc(postsRef, object);
    toast.success("Post added successfully");
  } catch (error) {
    toast.error(`Error adding post: ${error.message}`);
  }
};

export const getStatus = (setAllPosts) => {
  onSnapshot(postsRef, (res) => {
    setAllPosts(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
    return res.docs;
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    const posts = response.docs.map((docs) => {
      return { ...docs.data(), id: docs.id };
    });
    console.log("Fetched posts:", posts);
    setAllStatus(posts);
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    const users = response.docs.map((docs) => {
      return { ...docs.data(), id: docs.id };
    })[0];
    console.log("Fetched user:", users); // Add this line to debug
    setCurrentUser(users);
  });
};

export const likePost = (userId, postId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const postComment = async (postId, comment, timeStamp, name) => {
  try {
    await addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name,
    });
    console.log("Comment added successfully");
  } catch (err) {
    console.log("Error posting comment:", err);
  }
};

export const getLikesByUser = (userId, postId, setIsLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setIsLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComments = (postId, setComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (postId, post) => {
  try {
    updateDoc(doc(postsRef, postId), {
      post,
    });
    toast.success("Post updated successfully");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(postsRef, postId));
    console.log(postId);
    toast.success("Post deleted successfully");
  } catch (err) {
    console.error("Error deleting post:", err);
    toast.error("Failed to delete post");
  }
};

export const addConnection = async (user1Id, user2Id) => {
  const connectionId = `${user1Id}_${user2Id}`;
  const docToConnection = doc(connectionsRef, connectionId);
  try {
    await setDoc(docToConnection, {
      user1: user1Id,
      user2: user2Id,
    });
    toast.success("connection added successfully");
  } catch (e) {
    console.log(e);
    toast.error("Failed to add connection");
  }
};

export const getConnections = (
  user1,
  user2,
  setIsConnected
) => {
  try {
    const q = query(connectionsRef, where("user2", "==", user2));
    onSnapshot(q, (snapshot) => {
      const connections = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      const isConnected = connections.some((connection) => {
        return connection.user1 === user1;
      });
      setIsConnected(isConnected);
    });
  } catch (e) {
    console.log(e);
    toast.error("Failed to add connection");
  }
};

