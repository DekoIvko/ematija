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
import RequireAuth from "../hooks/RequireAuth";

const LazyProfilePage = React.lazy(
  () => import("../pages/ProfilePage/ProfilePage")
);
const LazyProductsPage = React.lazy(
  () => import("../pages/ProductsPage/ProductsPage")
);
const LazyLoginPage = React.lazy(
  () => import("../pages/Features/LogInPage/LogInPage")
);
const LazySignUpPage = React.lazy(
  () => import("../pages/Features/SignUpPage/SignUpPage")
);
const LazyProductPage = React.lazy(
  () => import("../pages/ProductsPage/Product/Product")
);
const LazyNewProductPage = React.lazy(
  () => import("../pages/ProductsPage/NewProductPage/NewProductPage")
);
const LazyNotFoundPage = React.lazy(
  () => import("../pages/Features/NotFoundPage/NotFoundPage")
);
const LazyUnAuthorizedPage = React.lazy(
  () => import("../pages/Features/UnAuthorizedPage")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        path={EHeaderNavItems.login}
        element={
          <Suspense fallback={<Loader />}>
            <LazyLoginPage />
          </Suspense>
        }
      />
      <Route
        path={EHeaderNavItems.signup}
        element={
          <Suspense fallback={<Loader />}>
            <LazySignUpPage />
          </Suspense>
        }
      />
      <Route
        path="unauthorized"
        element={
          <Suspense fallback={<Loader />}>
            <LazyUnAuthorizedPage />
          </Suspense>
        }
      />
      <Route element={<RequireAuth />}>
        <Route
          path={EHeaderNavItems.home}
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
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
      </Route>
      <Route
        path={EHeaderNavItems.products}
        element={<ProductsLayout />}
        errorElement={<ProductError />}
      >
        <Route element={<RequireAuth />}>
          <Route
            path=""
            element={
              <Suspense fallback={<Loader />}>
                <LazyProductsPage />
              </Suspense>
            }
          />
          <Route
            path="new-product"
            element={
              <Suspense fallback={<Loader />}>
                <LazyNewProductPage />
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
      </Route>
      <Route
        path="not-found"
        element={
          <Suspense fallback={<Loader />}>
            <LazyNotFoundPage />
          </Suspense>
        }
      />
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
