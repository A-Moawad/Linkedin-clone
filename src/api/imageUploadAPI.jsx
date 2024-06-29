import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const startUpload = (image, setImageLink, setProgress) => {
  if (!image) return;

  const storageRef = ref(storage, `/images/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        setImageLink(response);
        setProgress(0); // Reset progress after upload is complete
      });
    }
  );
};

export const getPostImage = (file, setPostImage, setProgress) => {
  const postRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        setPostImage(response);
      });
    }
  );
};

export const uploadPostPicture = (file, setPostPicture, setProgress) => {
  const postRef = ref(storage, `postPictures/${file.name}`);
  const uploadTask = uploadBytesResumable(postRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        setPostPicture(response);
      });
    }
  );
};
