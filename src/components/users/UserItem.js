import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserItem = (props) => {
  //destructuring Method to access variables from the state
  const { login, avatar } = props;
  return (
    <div className="card text-center">
      <img
        src={avatar}
        alt=""
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
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
