import React, { Component, Fragment } from "react";
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
class App extends Component {
  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null,
  };
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
  };
  //search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      //q=${text}& this is the search function for the githubAPI[Reference: https://developer.github.com/v3/search/#search-repositories].
      //&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} these are the OAUTH key values
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Here we use setState to allow our users array created in state to be equal to the reqest: res.data.items, a formatted json string containing our required values.
    //Set loading to false for a successful completion of our query.
    this.setState({ users: res.data.items, loading: false });
  };
  //Get a single Github User
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      //q=${text}& this is the search function for the githubAPI[Reference: https://developer.github.com/v3/search/#search-repositories].
      //&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} these are the OAUTH key values
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Here we use setState to allow our users array created in state to be equal to the reqest: res.data.items, a formatted json string containing our required values.
    //Set loading to false for a successful completion of our query.
    this.setState({ user: res.data, loading: false });
  };
  //Get Users Repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      //q=${text}& this is the search function for the githubAPI[Reference: https://developer.github.com/v3/search/#search-repositories].
      //&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} these are the OAUTH key values
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Here we use setState to allow our users array created in state to be equal to the reqest: res.data.items, a formatted json string containing our required values.
    //Set loading to false for a successful completion of our query.
    this.setState({ repos: res.data, loading: false });
  };
  //Clear Users
  clearUsers = () => this.setState({ users: [], loading: false });
  //Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };
  render() {
    const { users, loading, user, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar title="Gihub Finder" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
    );
  }
}

export default App;
