import React, { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import RootLayout from "../layouts/RootLayout";
import { EHeaderNavItems } from "../enums/EHeaderNavItems";
import ProductsLayout from "../layouts/ProductsLayout";
import { Loader } from "../components";
import ProductError from "../pages/ProductsPage/ProductError/ProductError";

const LazyProfilePage = React.lazy(
  () => import("../pages/ProfilePage/ProfilePage")
);
const LazyProductsPage = React.lazy(
  () => import("../pages/ProductsPage/ProductsPage")
);
const LazyLoginPage = React.lazy(
  () => import("../pages/Features/LogInPage/LogInPage")
);
const LazyProductPage = React.lazy(
  () => import("../pages/ProductsPage/Product/Product")
);
const LazyNotFoundPage = React.lazy(
  () => import("../pages/Features/NotFoundPage/NotFoundPage")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="home" element={<HomePage />} />
      <Route
        path={EHeaderNavItems.login}
        element={
          <Suspense fallback={<Loader />}>
            <LazyLoginPage />
          </Suspense>
        }
      />
      <Route
        path={EHeaderNavItems.profile}
        element={
          <Suspense fallback={<Loader />}>
            <LazyProfilePage />
          </Suspense>
        }
      />
      <Route
        path={EHeaderNavItems.products}
        element={<ProductsLayout />}
        errorElement={<ProductError />}
      >
        <Route
          path=""
          element={
            <Suspense fallback={<Loader />}>
              <LazyProductsPage />
            </Suspense>
          }
        />
        <Route
          path=":id"
          element={
            <Suspense fallback={<Loader />}>
              <LazyProductPage />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
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
