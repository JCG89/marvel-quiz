import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase/FireBaseConfig";

import Logout from "../Logout";
import Quiz from "../Quiz";
const Welcome = () => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user ? setUserSession(user) : navigate("/");
    });
    return listener();
  }, [navigate]);
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
