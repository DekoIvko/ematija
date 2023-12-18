import { Navigate, Outlet, useLocation } from "react-router";
import { useUserAuthContext } from "../context/UserAuthContext";

const RequireAuth = () => {
  const location = useLocation();
  const authUser = useUserAuthContext();

  return (
    <>
      {authUser?.isTokenValid() ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
