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

const largeColumn = {
  width: "40%"
};
const midColumn = {
  width: "30%"
};
const smallColumn = {
  width: "10%"
};

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

// const isSearched = function higherOrderFunc(searchTerm) {
//   return function returnedFunction(item) {
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   };
// };

const Button = ({ onClick, className = "", children }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
};

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children}
      <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div>
      {list.filter(isSearched(pattern)).map(item => {
        return (
          <div key="item.objectID" className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>

            <span style={midColumn}>{item.author}</span>

            <span style={smallColumn}>{item.num_comments}</span>

            <span style={smallColumn}>{item.points}</span>

            <span syle={smallColumn}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        );
      })}
    </div>
  );
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
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            {/* now the {children} will render search text */}
            Search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

export default App;
