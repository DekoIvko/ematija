import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import LogInPage from "../pages/Features/LogInPage/LogInPage";
// import  AuthProvidere  from "../hooks/AuthProvider";
import NotFoundPage from "../pages/Features/NotFoundPage";
import { StateContext } from "../store/store";

const Router = () => {
  const usenavigation = useNavigate();
  const { dispatch } = useContext(StateContext);

  useEffect(() => {
    const checkUser = localStorage.getItem("ematija-user");
    if (!checkUser) {
      usenavigation("login");
    } else {
      const parserUser = JSON.parse(checkUser);
      dispatch({ type: "setLogedUser", payload: parserUser });
    }
  }, [usenavigation]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        {/* <AuthProvidere > */}

        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* </AuthProvidere> */}
      </Routes>
    </div>
  );
};

export default Router;
