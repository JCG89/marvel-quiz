import React from "react";

export default function neutre() {
  return (
    <div>
      <div className="stepsBtnContainer">
        <p className="successMsg">Bravo vous êtes un expert!</p>
        <button className="btnResult success">Niveau suivant</button>
      </div>
      <div className="percentage">
        <div className="progressPercent">Réussite: 10%</div>
        <div className="progressPercent">Notes: 10/10</div>
      </div>
    </div>
  );
}
