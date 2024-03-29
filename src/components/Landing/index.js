import React from "react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  {
    /* Ajout d'une reference ref et du state pour modifier l'image et afficher les bouttons */
  }
  const [btn, setBtn] = useState(false);

  const refWolverine = useRef(null);

  useEffect(() => {
    refWolverine.current.classList.add("startingImg");

    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000);
  }, []);
  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg");
  };

  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
  };
  const clearImg = () => {
    if (refWolverine.current.classList.contains("rightImg")) {
      refWolverine.current.classList.remove("rightImg");
    } else {
      refWolverine.current.classList.remove("leftImg");
    }
  };
  const displayBtn = btn && (
    <>
      <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
        <Link className="btn-welcome" to="/signup">
          Inscription
        </Link>
      </div>
      <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
        <Link className="btn-welcome" to="/login">
          Connexion
        </Link>
      </div>
    </>
  );
  return (
    <main ref={refWolverine} className="welcomePage">
      {displayBtn}
    </main>
  );
};
export default Landing;
