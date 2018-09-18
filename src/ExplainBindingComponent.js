import React, { Component } from "react";

class ExplainBindingsComponent extends Component {
  constructor() {
    super();
    this.a = 5;
    this.onClickMe = this.onClickMe.bind(this);
  }
  onClickMe() {
    console.log(this.a);
  }
  render() {
    return (
      <button onClick={this.onClickMe} type="button">
        Click Me
      </button>
    );
  }
}

export default ExplainBindingsComponent;
