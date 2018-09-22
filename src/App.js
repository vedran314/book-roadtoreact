import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: "Angular",
    url: "https://github.com/angular/angular",
    author: "Angular",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());

const isSearched = function higherOrderFunc(searchTerm) {
  return function returnedFunction(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: ""
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onDismiss(id) {
    const isNotId = function isNotId(item) {
      return item.objectID !== id;
    };

    const updatedList = this.state.list.filter(isNotId);

    this.setState({ list: updatedList });
  }
  render() {
    return (
      <div className="App">
        <form>
          <input type="text" onChange={this.onSearchChange} />
        </form>
        {/*
        returned function from isSearched has access to the item object
        because IT IS THE FUNCTION that is passed to the filter function.
         */}
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => {
          return (
            <div key="item.objectID">
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  Dismiss
                </button>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
