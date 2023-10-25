import { useContext } from "react";
import mkFlag from "../../imgs/MKFlag.png";
import { NavLink } from "react-router-dom";
import { StateContext } from "../../store/store";
import { EHeaderNavItems } from "../../enums/EHeaderNavItems";

import "./Header.scss";

const Header = () => {
  const { state } = useContext(StateContext);

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
                    className="bi bi-shop"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
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
