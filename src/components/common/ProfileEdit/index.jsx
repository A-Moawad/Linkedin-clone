import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from "../../../api/FireStoreAPI";
import "./index.scss";

import { startUpload } from "../../../api/imageUploadAPI";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
    console.log(editInputs);
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
    console.log(editInputs);
  };

  return (
    <div className="profile-card">
      <div className="profile-edit-inputs">
        <div className="close-btn">
          <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
        </div>
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />
        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          value={editInputs.headline}
          name="headline"
        />
        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          value={editInputs.company}
          name="company"
        />
        <label>Industry </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Industry"
          name="industry"
          value={editInputs.industry}
        />
        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        />
        <label>Website</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>
        <textarea
          placeholder="About Me"
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Skill"
          name="skills"
          value={editInputs.skills}
        />
        <div className="save-container">
          <button className="save-btn" onClick={updateProfileData}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
