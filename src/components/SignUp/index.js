import React from "react";
import ironman from "../../images/ironman.png";
import { useState } from "react";

const SignUp = () => {
  const widthImg = {
    width: "400px",
    height: "400px",
  };
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [signUpData, setSignUpData] = useState(data);
  const changeInput = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  const { pseudo, email, password, confirmPassword } = signUpData;

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  return (
    <div className="signUpBoxLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignUp">
          <img style={widthImg} src={ironman} alt="ironman" />
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Inscription</h2>
            <form action="">
              <div className="inputBox">
                <input
                  value={pseudo}
                  onChange={changeInput}
                  type="text"
                  id="pseudo"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  value={email}
                  onChange={changeInput}
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  value={password}
                  onChange={changeInput}
                  type="password"
                  id="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  value={confirmPassword}
                  onChange={changeInput}
                  type="password"
                  id="confirmPassword"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
