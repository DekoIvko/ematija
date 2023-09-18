import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "../components/index";
import HomePage from "../pages/HomePage/HomePage";
import { StateContext } from "../store/store";

const LazyProfilePage = React.lazy(
  () => import("../pages/ProfilePage/ProfilePage")
);
const LazyLoginPage = React.lazy(
  () => import("../pages/Features/LogInPage/LogInPage")
);
const LazyNotFoundPage = React.lazy(
  () => import("../pages/Features/NotFoundPage/NotFoundPage")
);

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
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LazyLoginPage />} />
        <Route path="/profile" element={<LazyProfilePage />} />
        <Route path="*" element={<LazyNotFoundPage />} />
      </Routes>
    </div>
  );
};

export default Router;
