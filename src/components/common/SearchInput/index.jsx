import React from "react";
import "./index.scss";
import { IoIosClose } from "react-icons/io";

function SearchInput({ setSearchInput, setIsSearchClicked }) {
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCloseBtnClick = () => {
    setIsSearchClicked(false);
  };

  return (
    <div className="input-container">
      <input
        className="common-input search-input"
        type="text"
        placeholder="search"
        onChange={handleInputChange}
      />
      <IoIosClose className="close-btn" onClick={handleCloseBtnClick} />
    </div>
  );
}

export default SearchInput;
