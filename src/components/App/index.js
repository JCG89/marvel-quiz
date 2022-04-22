import React from "react";
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Login";
import SignUp from "../SignUp";
import ForgetPassword from "../ForgetPassword";
import "../../App.css";
import ErrorPage from "../ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IconContext } from "react-icons";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </IconContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
