import React from "react";
import PropTypes from "prop-types";

const UserItem = (props) => {
  //destructuring Method to access variables from the state
  return (
    <div className="card text-center">
      <img
        src={props.avatar}
        alt=""
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{props.login}</h3>
      <div>
        <a href={props.html_url} className="btn btn-dark btn-sm my-1">
          More
        </a>
      </div>
    </div>
  );
};
UserItem.propTypes = {
  login: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
};
export default UserItem;
