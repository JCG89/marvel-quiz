import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import spiderman from "../../images/spiderman.png";
import { auth } from "../FireBase/FireBaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (password.length > 5 && password !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email, btn]);
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        navigate("/welcome", { replace: true });
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="signUpLOginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignUp">
          <img src={spiderman} alt="spiderman" />
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" || (error !== null && <span>error!</span>)}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <button disabled={btn ? false : true}>Connexion</button>
              <Link className="simpleLink" to="/forget-password">
                Mot de passe oublié ?
              </Link>
            </form>
            <div className="linkeContainer">
              <Link className="simpleLink" to="/signup">
                Pas encore de compte? inscrivez-vous!
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
