import React, { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import RootLayout from "../layouts/RootLayout";

const LazyProfilePage = React.lazy(
  () => import("../pages/ProfilePage/ProfilePage")
);
const LazyLoginPage = React.lazy(
  () => import("../pages/Features/LogInPage/LogInPage")
);
const LazyNotFoundPage = React.lazy(
  () => import("../pages/Features/NotFoundPage/NotFoundPage")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="home" element={<HomePage />} />
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
    </Route>
  )
);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
