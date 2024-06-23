import linkedInLogo from "../../../assets/linkedinLogo.png"; // Ensure the correct path to the image
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import userIcon from "../../../assets/userIcon.jpg";
import { useMatch, useNavigate } from "react-router-dom";
import { signOutAPI } from "../../../api/AuthAPI";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { getAllUsers, getCurrentUser } from "../../../api/FireStoreAPI";

function Topbar({  }) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  useEffect(() => {
    getAllUsers(setUsers);
  });
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileClick = () => {
    navigate("/profile", {
      state: {
        id: currentUser?.id,
      },
    });
    setDropdownVisible(false);
  };

  const handleSignOutClick = () => {
    signOutAPI();
    setDropdownVisible(false);
  };

  return (
    <div className="topbar">
      <img src={linkedInLogo} alt="LinkedIn Logo" className="logo" />
      <div className="icons">
        <AiOutlineSearch className="icon search" />
        <AiOutlineHome
          className="icon home"
          onClick={() => navigate("/home")}
        />
        <AiOutlineUserSwitch className="icon connections " />
        <AiOutlineMessage className="icon message" />
        <AiOutlineBell className="icon notifications" />
        <div className="user-container">
          <img
            src={currentUser.imageLink}
            alt="user icon"
            className="icon user"
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <ul className="dropdown">
              {/* <li className="dropdown-item">
                {getCurrentUser.name}
              </li> */}
              <li className="dropdown-item" onClick={handleProfileClick}>
                View Your Profile
              </li>
              <li className="dropdown-item" onClick={handleSignOutClick}>
                Sign Out
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
