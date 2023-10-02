import { useContext } from "react";
import { IStateContext, StateContext } from "../../store/store";
import { INavigationItems } from "../../interfaces/INavigationItems";
import { ENavigationItems } from "../../enums/ENavigationItems";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";
import Messenger from "./Messenger/Messenger";

import { Loader, StatusMessage } from "../../components/index";

import Feed from "./Feed/Feed";
import Quotes from "./Quotes/Quotes";
import Todos from "./Todos/Todos";
import Products from "./Products/Products";

import "./HomePage.scss";

const HomePage = () => {
  console.log("Components HomePage");
  const { state, dispatch } = useContext<IStateContext>(StateContext);

  const setNavItem = (navItem: INavigationItems) => {
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
          <div className="navigation d-flex flex-column column align-self-start bd-highlight flex-grow-1">
            <NavigationMenu state={state} setNavItem={setNavItem} />
          </div>
          {state?.activeNavItem === ENavigationItems.feed ? (
            <div className="main d-flex flex-column align-self-center ">
              <Feed feedType="home-page" />
            </div>
          ) : null}
          {state?.activeNavItem === ENavigationItems.quotes ? (
            <div className="main d-flex flex-column align-self-center ">
              <Quotes />
            </div>
          ) : null}
          {state?.activeNavItem === ENavigationItems.todos ? (
            <div className="main d-flex flex-column align-self-center ">
              <Todos />
            </div>
          ) : null}
          {state?.activeNavItem === ENavigationItems.products ? (
            <div className="main d-flex flex-column align-self-center ">
              <Products />
            </div>
          ) : null}
          <div className="navigation d-flex flex-column flex-grow-1 ">
            <Messenger />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
