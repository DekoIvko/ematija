import { IInitialStore } from "../../../interfaces/IInitialStore";
import { ENavigationItems } from "../../../enums/ENavigationItems";

import "./NavigationMenu.scss";
interface IProps {
  state: IInitialStore;
  page: string;
  setPage: any;
}

export const NavigationMenu = ({ state, page, setPage }: IProps) => {
  console.log("Component NavigationMenu");
  return (
    <div className="container navigation-menu">
      {" "}
      <div className="profile-name flex align-items-center">
        <img
          src={state?.loggedUser?.image}
          alt="User profile"
          style={{ maxWidth: "50px", maxHeight: "50px" }}
        />
        <div className="m-0 p-2">{`${state?.loggedUser?.firstName} ${state?.loggedUser?.lastName}`}</div>
      </div>
      <nav className="navigation-bar flex">
        <ul className="list-group flex flex-col gap-2 w-100">
          <li
            className="list-group-item"
            onClick={() => setPage(ENavigationItems.feed)}
          >
            <button
              className={`${
                page === "feed" ? "top-link-item active" : ""
              } btn btn-link`}
            >
              Feed
            </button>
          </li>
          <li
            className="list-group-item"
            onClick={() => setPage(ENavigationItems.quotes)}
          >
            <button
              className={`${
                page === "quotes" ? "top-link-item active" : ""
              } btn btn-link`}
            >
              Quotes
            </button>
          </li>
          <li
            className="list-group-item"
            onClick={() => setPage(ENavigationItems.todos)}
          >
            <button
              className={`${
                page === "todos" ? "top-link-item active" : ""
              } btn btn-link`}
            >
              Todos
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
