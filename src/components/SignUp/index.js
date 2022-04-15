import React from "react";
import ironman from "../../images/ironman.png";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../FireBase/FireBaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { setDoc } from "firebase/firestore";

const SignUp = (props) => {
  const navigate = useNavigate();

  const widthImg = {
    width: "400px",
    height: "400px",
    filter: "brightness(1.5)",
  };
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [signUpData, setSignUpData] = useState(data);
  const [error, setError] = useState("");
  const changeInput = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = signUpData;
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return setDoc(user(authUser.user.uid), {
          pseudo,
          email,
        });
      })
      .then((user) => {
        setSignUpData({ ...data });
        navigate("/welcome");
      })
      .catch((error) => {
        setError(error);
        setSignUpData({ ...data });
      });
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
            {error !== "" && <span>error!</span>}

            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
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
            <div className="linkeContainer">
              <Link className="simpleLink" to="/login">
                Déja inscris? Connectez-vous!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
