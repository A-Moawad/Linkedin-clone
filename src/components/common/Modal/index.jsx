import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  post,
  setPost,
  sendPost,
  isEdit,
  updatePost,
  // uploadPostImage,
  // setPostImage,
  // postImage,
  // currentPost,
  // setCurrentPost,
}) => {
  // const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          // setStatus("");
          setModalOpen(false);
          // setPostImage("");
          // setCurrentPost({});
        }}
        onCancel={() => {
          // setStatus("");
          setModalOpen(false);
          // setPostImage("");
          // setCurrentPost({});
        }}
        footer={[
          <Button
            onClick={isEdit ? updatePost : sendPost}
            key="submit"
            type="primary"
            disabled={post.length > 0 ? false : true}
          >
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <input
          className="modal-input"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="What do you want to talk about?"/>
      </Modal>
    </>
  );
};

export default ModalComponent;
