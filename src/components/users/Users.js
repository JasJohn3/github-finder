import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
const Users = (props) => {
  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      //program contained an error when passing array values so I manually extracted
      //and created prop types for each value being searched.[key={user.id},login={user.login},avatar={user.avatar_url},html_url={user.html_url}]
      <div style={userStyle}>
        {props.users.map((user) => (
          <UserItem
            key={user.id}
            login={user.login}
            avatar={user.avatar_url}
            html_url={user.html_url}
          />
        ))}
      </div>
    );
  }
};
Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};
export default Users;
