import { useContext } from "react";
import mkFlag from "../../imgs/MKFlag.png";
import { NavLink } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { StateContext } from "../../store/store";
import { EHeaderNavItems } from "../../enums/EHeaderNavItems";

import "./Header.scss";

const Header = () => {
  const { state, dispatch } = useContext(StateContext);

  const responseFacebook = (response: any) => {
    dispatch({ type: "setFacebookUser", payload: response });
  };

  const onLogOut = () => {
    localStorage.removeItem("ematija-user");
    window.location.reload();
  };

  return (
    <header
      className="header"
      style={{
        background: state?.appTheme === "dark" ? "#242526" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      <div className="container-fluid d-flex align-items-center">
        <div className="header-context d-flex flex-row align-items-center">
          <div className="company-logo">
            <a href="/home" className="logo">
              <img src={mkFlag} alt="Macedonian flag" />
            </a>
          </div>
          <div className="login-facebook">
            {state?.facebookUser.id ? (
              <>
                <img
                  src={state?.facebookUser?.picture?.data?.url || ""}
                  alt="Facebook profile"
                />
              </>
            ) : (
              <FacebookLogin
                cssClass="fb-button"
                appId="1497963941017501"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
              />
            )}
          </div>
        </div>
        <nav className="navigate-icons d-flex justify-content-center">
          <ul className="list-group list-group-flush d-flex flex-row">
            <li className="list-group-item">
              <NavLink
                to={EHeaderNavItems.home}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "top-link-itm pending"
                    : isActive
                    ? "top-link-itm active"
                    : ""
                }
              >
                <div className="d-flex flex-column">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                  </svg>
                  <span>Home</span>
                </div>
              </NavLink>
            </li>
            <li className="list-group-item">
              <NavLink
                to={EHeaderNavItems.profile}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "top-link-itm pending"
                    : isActive
                    ? "top-link-itm active"
                    : ""
                }
              >
                <div className="d-flex flex-column">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                  <span>Profile</span>
                </div>
              </NavLink>
            </li>
            <li className="list-group-item">
              <NavLink
                to={EHeaderNavItems.products}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "top-link-itm pending"
                    : isActive
                    ? "top-link-itm active"
                    : ""
                }
              >
                <div className="d-flex flex-column">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                  <span>Products</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <button
            type="button"
            className="btn btn-link"
            style={{ width: "max-content", textDecoration: "none" }}
            onClick={onLogOut}
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
