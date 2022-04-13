import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../FireBase/FireBaseConfig";
const Logout = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      signOut(auth)
        .then(() => {
          // Si la connexion a reussi.
          navigate("/");
        })
        .catch((error) => {
          console.log("Oups nous avons une erreur");
          // S'il y'a une erreur.
        });
    }
  }, [checked, navigate]);
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
export default Logout;
