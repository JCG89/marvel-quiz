import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../FireBase/FireBaseConfig";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(null);
        setSuccess(
          `Un lien vient de vous être envoyé à ${email} ,veuillez consulter votre boite email!`
        );
        setEmail("");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };
  const disabled = email === "";
  return (
    <div className="signUpLOginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && (
              <span
                style={{
                  border: "1px solid green",
                  backgroundColor: "green",
                  color: "#ffff",
                }}
              >
                {success}
              </span>
            )}
            {error && <span>{error.message}</span>}
            <h2>Mot de passe oublié ?</h2>
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

              <button disabled={disabled}>Envoyer</button>
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
export default ForgetPassword;
