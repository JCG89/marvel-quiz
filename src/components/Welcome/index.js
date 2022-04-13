import React from "react";

import Logout from "../Logout";
import Quiz from "../Quiz";
const Welcome = () => {
  return (
    <div className="quiz-bg">
      <h1>Welcome</h1>
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  );
};
export default Welcome;
