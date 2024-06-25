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
import SearchInput from "../SearchInput/index";

function Topbar() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
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

  const handleSearchClick = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  return (
    <div className="topbar">
      <img src={linkedInLogo} alt="LinkedIn Logo" className="logo" />
      {!isSearchClicked ? (
        <div className="icons">
          <div className="icon-container">
            <AiOutlineSearch
              className="icon search"
              onClick={handleSearchClick}
            />
          </div>
          <div className="icon-container">
            <AiOutlineHome
              className="icon home"
              onClick={() => navigate("/home")}
            />
          </div>
          <div className="icon-container">
            <AiOutlineUserSwitch
              className="icon connections "
              onClick={() => navigate("/connections")}
            />
          </div>
          <div className="icon-container">
            <AiOutlineMessage className="icon message" />
          </div>
          <div className="icon-container">
            <AiOutlineBell className="icon notifications" />
          </div>
          <div className="user-container">
            <img
              src={currentUser.imageLink}
              alt="user icon"
              className="icon user"
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <ul className="dropdown">
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
      ) : (
        <>
          <AiOutlineSearch
            className="icon search"
            onClick={handleSearchClick}
          />
          <SearchInput />
        </>
      )}
    </div>
  );
}

export default Topbar;
