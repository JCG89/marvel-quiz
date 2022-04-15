import React, { Component } from "react";

class Quiz extends Component {
  render() {
    const { pseudo } = this.props.userData;
    return (
      <div>
        <p>PSEUDO:{pseudo} </p>
      </div>
    );
  }
}
export default Quiz;
