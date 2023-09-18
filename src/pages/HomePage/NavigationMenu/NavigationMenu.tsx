import React from "react";
import { NavLink } from "react-router-dom";
import { IInitialStore } from "../../../interfaces/IInitialStore";
import MaleCounter from "./PractisingHOC/MaleCounter";
import FemaleCounter from "./PractisingHOC/FemaleCounter";
import OtherCounter from "./PractisingHOC/OtherCounter";
import DogCounter from "./PractisingRenderProps/DogCounter";
import CatCounter from "./PractisingRenderProps/CatCounter";
import MouseCounter from "./PractisingRenderProps/MouseCounter";
import RenderPropsCounter from "../../../hooks/RenderPropsCounter";

import "./NavigationMenu.scss";
interface IProps {
  state: IInitialStore;
  setNavItem: any;
}

export const NavigationMenu = ({ state, setNavItem }: IProps) => {
  console.log(state);
  return (
    <div className="navigation-menu">
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
            <NavLink
              to="/"
              onClick={() => setNavItem("feed")}
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
          <li className="list-group-item">
            <NavLink
              to="/"
              onClick={() => setNavItem("quotes")}
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
          <li className="list-group-item">
            <NavLink
              to="/"
              onClick={() => setNavItem("todos")}
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
          <li className="list-group-item">
            <NavLink to="" className="links  nav-link">
              <MaleCounter description="Im a male" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="" className="links d-flex nav-link">
              <FemaleCounter description="Im a female" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="" className="links  nav-link">
              <OtherCounter description="Im a other" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="" className="links nav-link">
              <RenderPropsCounter
                render={(counter: number, onClickButtonCounter: any) => (
                  <DogCounter
                    description="Im a dog"
                    counter={counter}
                    onClickButtonCounter={onClickButtonCounter}
                  />
                )}
              />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="" className="links nav-link">
              <RenderPropsCounter
                render={(counter: number, onClickButtonCounter: any) => (
                  <CatCounter
                    description="Im a cat"
                    counter={counter}
                    onClickButtonCounter={onClickButtonCounter}
                  />
                )}
              />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="" className="links nav-link">
              <RenderPropsCounter
                render={(counter: number, onClickButtonCounter: any) => (
                  <MouseCounter
                    description="Im a mouse"
                    counter={counter}
                    onClickButtonCounter={onClickButtonCounter}
                  />
                )}
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
