import React, { Component } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar";
import UserItem from "./components/users/UserItem";
import Users from "./components/users/Users";
class App extends Component {
  foo = () => {
    return <p>Method Example</p>;
  };

  render() {
    const name = "John Doe";
    const foo = () => {
      return <p>Function Example</p>;
    };
    return (
      <div className="App">
        <Navbar title="Gihub Finder" />
        <h1>Hello {name.toUpperCase()}</h1>
        {this.foo()}
        {foo()}
        <UserItem />
        <div className="container">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
