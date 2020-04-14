import React, { Component, Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import axios from "axios";
import PropTypes from "prop-types";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

import GithubState from "./context/github/GithubState";
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Get a single Github User
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      //q=${text}& this is the search function for the githubAPI[Reference: https://developer.github.com/v3/search/#search-repositories].
      //&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} these are the OAUTH key values
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Here we use setState to allow our users array created in state to be equal to the reqest: res.data.items, a formatted json string containing our required values.
    //Set loading to false for a successful completion of our query.
    setUser(res.data);
    setLoading(false);
  };
  //Get Users Repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      //q=${text}& this is the search function for the githubAPI[Reference: https://developer.github.com/v3/search/#search-repositories].
      //&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} these are the OAUTH key values
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Here we use setState to allow our users array created in state to be equal to the reqest: res.data.items, a formatted json string containing our required values.
    //Set loading to false for a successful completion of our query.
    setRepos(res.data);
    setLoading(false);
  };
  //Clear Users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
  //Alert
  const showAlert = (msg, type) => {
    setAlert(msg, type);

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Gihub Finder" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              ></Route>
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};
App.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
};
export default App;
