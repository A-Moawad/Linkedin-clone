import { useState, useEffect } from "react";
import PostsCard from "../PostsCard/index";
import {
  editProfile,
  getSingleStatus,
  getSingleUser,
} from "../../../api/FireStoreAPI";
import "./index.scss";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { startUpload } from "../../../api/imageUploadAPI";
import ImageModal from "../ImageModal/imageModal";

function ProfileCard({ currentUser, onEdit }) {
  const location = useLocation();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [allStatus, setAllStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (imageLink) {
      editProfile(currentUser.id, { imageLink });
    }
  }, [imageLink, currentUser.id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (location?.state?.id) {
          await getSingleStatus(setAllStatus, location.state.id);
        }

        if (location?.state?.email) {
          await getSingleUser(setCurrentProfile, location.state.email);
        } else {
          setCurrentProfile(currentUser);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location?.state?.id, location?.state?.email, currentUser]);

  const getImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (image) {
      try {
        await startUpload(image, setImageLink, setProgress);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected for upload.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const profile = currentProfile || currentUser;

  return (
    <>
      <ImageModal
        handleCancel={() => setIsModalOpen(false)}
        handleOk={handleImageUpload}
        isModalOpen={isModalOpen}
        image={image}
        getImage={getImage}
        progress={progress}
      />
      <div className="profile-card-container">
        <div className="profile-main">
          <div className="user-details">
            {profile?.imageLink && (
              <img
                className="profile-img"
                src={profile.imageLink}
                alt="profile"
                onClick={() => setIsModalOpen(true)}
              />
            )}
            <h3 className="username">{profile?.name}</h3>
            <p className="headline">{profile?.headline}</p>
            {(profile?.city || profile?.country) && (
              <p className="country-city">{`${profile.city}, ${profile.country}`}</p>
            )}
          </div>
          <div className="right-info">
            <p className="college">{profile?.college}</p>
            <p className="company">{profile?.company}</p>
            {profile?.skills && (
              <p className="skills">
                <span className="skill-label">Skills</span>:&nbsp;
                {profile.skills}
              </p>
            )}
          </div>
          {profile?.email === userEmail && (
            <MdOutlineEdit className="edit-btn" onClick={onEdit} />
          )}
        </div>
        <div className="all-posts">
          {allStatus.length > 0 ? (
            allStatus.map((posts) => (
              <PostsCard
                key={posts.id}
                post={posts}
                currentProfile={currentProfile}
              />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
