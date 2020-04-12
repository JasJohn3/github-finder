import React from "react";
import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
  return (
    <div className="card">
      <div className="btn btn-dark btn-block">
        <a href={repo.html_url}>{repo.name}</a>
      </div>
    </div>
  );
};
RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};
export default RepoItem;
