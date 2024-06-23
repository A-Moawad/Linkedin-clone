import { Button, Modal, Progress } from "antd";
import "./imageModal.scss";
function ImageModal({
  isModalOpen,
  handleCancel,
  handleOk,
  image,
  getImage,
  progress,
}) {
  return (
    <Modal
      title="Add a Profile Image"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          disabled={!image}
        >
          Upload Profile Picture
        </Button>,
      ]}
    >
      <div className="upload-image-container">
        <label htmlFor="image-upload">Add an image</label>
        <input  hidden id="image-upload" type="file" onChange={getImage} />
        {progress > 0 && (
          <div className="progress-bar">
            <Progress type="circle" percent={progress} />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ImageModal;
