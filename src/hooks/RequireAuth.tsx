import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = () => {
  const location = useLocation();
  const userAndToken = JSON.parse(window.localStorage.getItem("ematija-user")!);
  return (
    <>
      {userAndToken?.accessToken ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
