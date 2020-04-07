import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
class App extends Component {
  state = {
    users: [],
    loading: false,
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
  render() {
    return (
      <div className="App">
        <Navbar title="Gihub Finder" />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
