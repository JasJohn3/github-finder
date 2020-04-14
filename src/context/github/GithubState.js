import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const setLoading = () => dispatch({ type: SET_LOADING });
  //search Github users
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      //q=${text}& this is the search function for the githubAPI[Reference: https://developer.github.com/v3/search/#search-repositories].
      //&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} these are the OAUTH key values
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Here we use setState to allow our users array created in state to be equal to the reqest: res.data.items, a formatted json string containing our required values.
    //Set loading to false for a successful completion of our query.
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };
  //Get User

  //Get Repos

  //Clear Users

  //Set Loading

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};
export default GithubState;
