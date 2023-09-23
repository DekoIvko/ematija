import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../components/index";
import HomePage from "../pages/HomePage/HomePage";

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
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <Suspense>
              <LazyLoginPage />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense>
              <LazyProfilePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <LazyNotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
