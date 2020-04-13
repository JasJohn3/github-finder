import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    //e.target.name allows access to the input box name creating a variable based on the type of input.
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a valid search parameter!", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <input
          type="submit"
          className="btn btn-light btn-block"
          onClick={clearUsers}
          value="Clear"
        />
      )}
    </div>
  );
};
Search.propType = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};
export default Search;
