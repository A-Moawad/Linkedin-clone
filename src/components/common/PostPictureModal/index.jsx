import React, { useState } from "react";
import { Modal } from "antd";
import "./index.scss";

function PostPicture({ post }) {
  const [open, setOpen] = useState(false);
  console.log(post);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {post.postPicture ? (
        <img
          className="post-picture"
          src={post.postPicture}
          onClick={showModal}
          alt="Post"
        />
      ) : (
        <></>
      )}
      <Modal open={open} footer={null} onCancel={handleCancel}>
        <img
          src={post.postPicture}
          className="post-picture"
          alt="Post"
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
}

export default PostPicture;
