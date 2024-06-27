import React, { useState } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import "./index.scss";

function PostPicture({ post }) {
  const [open, setOpen] = useState(false);

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
        <p>No picture available</p>
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
