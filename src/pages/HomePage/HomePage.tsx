import { useContext } from "react";
import { IStateContext, StateContext } from "../../store/store";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";

import { Loader, StatusMessage } from "../../components/index";

import Feed from "./Feed/Feed";
import Quotes from "./Quotes/Quotes";
import Todos from "./Todos/Todos";

import "./HomePage.scss";

const HomePage = () => {
  const { state, dispatch } = useContext<IStateContext>(StateContext);

  const setNavItem = (navItem: string) => {
    dispatch({ type: "setNavItem", payload: navItem });
  };

  return (
    <div
      className="home-page container-fluid d-flex flex-row gap-2"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      {state?.error && !state?.loader && (
        <StatusMessage status="error" message={state?.errorMessage} />
      )}
      {!state?.error && state?.loader && <Loader />}
      {!state?.error && !state?.loader && (
        <>
          <div className="navigation d-flex flex-column align-self-start bd-highlight flex-grow-1">
            <NavigationMenu state={state} setNavItem={setNavItem} />
          </div>
          {state?.activeNavItem === "feed" && (
            <div className="main d-flex flex-column align-self-center">
              <Feed feedType="home-page" />
            </div>
          )}
          {state?.activeNavItem === "quotes" && (
            <div className="main d-flex flex-column align-self-center">
              <Quotes />
            </div>
          )}
          {state?.activeNavItem === "todos" && (
            <div className="main d-flex flex-column align-self-center">
              <Todos />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
