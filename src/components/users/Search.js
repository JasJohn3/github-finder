import React, { Component } from "react";

class Search extends Component {
  state = {
    text: "",
  };

  onChange = (e) => {
    //e.target.name allows access to the input box name creating a variable based on the type of input.
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter a valid search parameter!", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };
  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChange}
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
  }
}

export default Search;
