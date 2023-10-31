import { useContext, useState } from "react";
import { IStateContext, StateContext } from "../../store/store";
import { ENavigationItems } from "../../enums/ENavigationItems";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";
import Messenger from "./Messenger/Messenger";

import { Loader, StatusMessage } from "../../components/index";

import Feed from "./Feed/Feed";
import Quotes from "./Quotes/Quotes";
import Todos from "./Todos/Todos";

import "./HomePage.scss";

const HomePage = () => {
  console.log("Components HomePage");
  const [page, setPage] = useState("feed");
  const { state } = useContext<IStateContext>(StateContext);

  return (
    <div
      className="home-page container-fluid d-flex flex-row gap-2"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      {state?.error && !state?.loader && (
        <StatusMessage
          from="home-page"
          status="error"
          message={state?.errorMessage}
        />
      )}
      {!state?.error && state?.loader && <Loader />}
      {!state?.error && !state?.loader && (
        <>
          {state && (
            <aside
              id="navigation-menu"
              className="navigation d-flex flex-column column align-self-start bd-highlight flex-grow-1"
            >
              <NavigationMenu state={state} page={page} setPage={setPage} />
            </aside>
          )}
          {page === ENavigationItems.feed ? (
            <section
              id="feed-section"
              className="section-page d-flex flex-column align-self-center "
            >
              <Feed feedType="home-page" />
            </section>
          ) : null}
          {page === ENavigationItems.quotes ? (
            <section
              id="quotes-section"
              className="section-page d-flex flex-column align-self-center "
            >
              <Quotes />
            </section>
          ) : null}
          {page === ENavigationItems.todos ? (
            <section
              id="todos-section"
              className="section-page d-flex flex-column align-self-center "
            >
              <Todos />
            </section>
          ) : null}
          {page && (
            <section
              id="messenger-users"
              className="navigation d-flex flex-column flex-grow-1 "
            >
              <Messenger />
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
