import React from "react";
import { Button, Modal, Progress } from "antd";
import { IoMdPhotos } from "react-icons/io";
import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./index.scss";
import { uploadPostPicture } from "../../../api/imageUploadAPI";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  post,
  setPost,
  sendPost,
  isEdit,
  updatePost,
  setPostPicture,
}) => {
  const [progress, setProgress] = useState(0);

  console.log(progress);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostPicture(file);
      uploadPostPicture(file, setPostPicture, setProgress);
    }
  };

  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
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
        <textarea
          className="modal-input"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="What do you want to talk about?"
        />
        <input
          type="file"
          id="upload-picture"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {progress > 0 && (
          <div className="progress-bar">
            <Progress type="circle" percent={progress} />
          </div>
        )}
        <label htmlFor="upload-picture">
          <IoMdPhotos className="picture icon" />
        </label>
      </Modal>
    </>
  );
};

export default ModalComponent;
