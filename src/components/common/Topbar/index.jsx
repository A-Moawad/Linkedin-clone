import { useEffect, useState } from "react";
import linkedInLogo from "../../../assets/linkedinLogo.png"; // Ensure the correct path to the image
import userIcon from "../../../assets/userIcon.jpg";
import { useNavigate } from "react-router-dom";
import { signOutAPI } from "../../../api/AuthAPI";
import "./index.scss";
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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setUsers);
  }, []);

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredUsers(searched);
    } else {
      setFilteredUsers([]);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

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
    if (!isSearchClicked) {
      setFilteredUsers([]);
      setSearchInput("");
    }
  };

  const handleUserClick = (user) => {
    navigate("/profile", {
      state: {
        id: user?.id,
        email: user?.email,
      },
    });
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <div className="topbar">
      <img
        src={linkedInLogo}
        alt="LinkedIn Logo"
        className="logo"
        onClick={handleLogoClick}
      />
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
              className="icon connections"
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
              src={currentUser.imageLink || userIcon}
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
          <SearchInput
            setSearchInput={setSearchInput}
            setIsSearchClicked={setIsSearchClicked}
          />
        </>
      )}
      {isSearchClicked && searchInput.length > 0 && (
        <div className="filtered-users-container">
          {filteredUsers.length === 0 ? (
            <div className="error">No Results Found.</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="filtered-user" key={user.id}>
                <img src={user.imageLink} alt="user image" />
                <p className="username" onClick={() => handleUserClick(user)}>
                  {user.name}
                </p>
                <p className="headline">{user.headline}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Topbar;
