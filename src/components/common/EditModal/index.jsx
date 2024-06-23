import { useState } from "react";
import { Button, Modal } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import "./editModal.scss";
import { updatePost } from "../../../api/FireStoreAPI";
const EditModal = ({post}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(""|| post.post);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText(post.post);
    setConfirmLoading(true);
    console.log(modalText, post.id);
    updatePost(post.id, modalText);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleChangeInput = (e) => {
    setModalText(e.target.value);
  }

  return (
    <>
      {/* <MdOutlineEdit className="edit-btn"  onClick={handleEditPost}/> */}

      <MdOutlineEdit className="edit-btn" type="primary" onClick={showModal}>
        Open Modal with async logic
      </MdOutlineEdit>
      <Modal
        title="update the post"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <input className="edit-post-input" value={modalText} onChange={handleChangeInput}/>
      </Modal>
    </>
  );
};


export default EditModal;