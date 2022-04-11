import React from "react";
import batman from "../../images/batman.png";

const ErrorPage = () => {
  const centerH2 = {
    textAlign: "center",
    marginTop: "50px",
  };
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={centerH2}>Oups , la page demandée est introuvable!</h2>
        <img src={batman} alt="batman" />
      </div>
    </div>
  );
};
export default ErrorPage;
