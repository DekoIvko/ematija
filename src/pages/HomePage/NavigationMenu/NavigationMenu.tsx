import { NavLink } from "react-router-dom";
import { IInitialStore } from "../../../interfaces/IInitialStore";

import "./NavigationMenu.scss";
interface IProps {
  state: IInitialStore;
  setNavItem: any;
}

export const NavigationMenu = ({ state, setNavItem }: IProps) => {
  return (
    <div className="navigation-menu">
      {" "}
      <div className="profile-name d-flex align-items-center">
        <img
          src={state?.loggedUser?.image}
          alt="Facebook profile"
          style={{ maxWidth: "50px", maxHeight: "50px" }}
        />
        <div className="m-0 p-2">{`${state?.loggedUser?.firstName} ${state?.loggedUser?.lastName}`}</div>
      </div>
      <div className="navigation-bar d-flex">
        <ul className="list-group d-flex flex-column gap-2 w-100">
          <li className="list-group-item" onClick={() => setNavItem("feed")}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "top-link-item pending"
                  : isActive
                  ? "top-link-item active"
                  : ""
              }
            >
              Feed
            </NavLink>
          </li>
          <li className="list-group-item" onClick={() => setNavItem("quotes")}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "top-link-item pending"
                  : isActive
                  ? "top-link-item active"
                  : ""
              }
            >
              Quotes
            </NavLink>
          </li>
          <li className="list-group-item" onClick={() => setNavItem("todos")}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "top-link-item pending"
                  : isActive
                  ? "top-link-item active"
                  : ""
              }
            >
              Todos
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
