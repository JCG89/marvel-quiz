import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../FireBase/FireBaseConfig";
import { getDoc } from "firebase/firestore";

import Logout from "../Logout";
import Quiz from "../Quiz";
const Welcome = () => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user ? setUserSession(user) : navigate("/");
    });
    if (!!userSession) {
      const colRef = user(userSession.uid);

      getDoc(colRef)
        .then((snapShot) => {
          if (snapShot.exists()) {
            const myData = snapShot.data();
            /*console.log(myData);
            console.log(snapShot.id);*/
            setUserData(myData);
          }
        })

        .catch((error) => {
          console.log(error);
        });
    }
    return listener();
  }, [navigate, userSession]);

  return (
    <div className="quiz-bg">
      <h1>Welcome</h1>
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};
export default Welcome;
