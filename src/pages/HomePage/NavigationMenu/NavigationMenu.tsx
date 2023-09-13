import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  state: any;
}

export const NavigationMenu = ({ state }: IProps) => {
  return (
    <div>
      {" "}
      <div className="profile-name d-flex align-items-center">
        <img
          src={state?.logedUser?.image}
          alt="Facebook profile"
          style={{ maxWidth: "50px", maxHeight: "50px" }}
        />
        <p className="m-0 p-2">{`${state?.logedUser?.firstName} ${state?.logedUser?.lastName}`}</p>
      </div>
      <div className="navigation-bar d-flex">
        <ul className="list-group d-flex flex-column gap-2 w-100">
          <li className="list-group-item">
            <Link
              className="links"
              to="/home"
              style={{
                color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
              }}
            >
              <div className="d-flex flex-row gap-2 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                </svg>
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="links"
              to="/profile"
              style={{
                color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
              }}
            >
              <div className="d-flex flex-row gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
                <span>Profile</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
