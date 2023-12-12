import { useContext, useState } from "react";
// import { IStateContext, StateContext } from "../../store/store";
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
  // const { state } = useContext<IStateContext>(StateContext);

  return (
    <div className="home-page container-fluid flex flex-row gap-2">
      {/* {state?.error && !state?.loader && (
        <StatusMessage
          from="home-page"
          status="error"
          message={state?.errorMessage}
        />
      )}
      {!state?.error && state?.loader && <Loader />} */}
      {/* {!state?.error && !state?.loader && ( */}
      <>
        {
          <aside
            id="navigation-menu"
            className="navigation flex flex-col column align-self-start bd-highlight flex-grow-1"
          >
            {/* <NavigationMenu state={state} page={page} setPage={setPage} /> */}
          </aside>
        }
        {page === ENavigationItems.feed ? (
          <section
            id="feed-section"
            className="section-page flex flex-col align-self-center "
          >
            <Feed feedType="home-page" />
          </section>
        ) : null}
        {page === ENavigationItems.quotes ? (
          <section
            id="quotes-section"
            className="section-page flex flex-col align-self-center "
          >
            <Quotes />
          </section>
        ) : null}
        {page === ENavigationItems.todos ? (
          <section
            id="todos-section"
            className="section-page flex flex-col align-self-center "
          >
            <Todos />
          </section>
        ) : null}
        {page && (
          <section
            id="messenger-users"
            className="navigation flex flex-col flex-grow-1 "
          >
            {/* <Messenger /> */}
          </section>
        )}
      </>
      {/* )} */}
    </div>
  );
};

export default HomePage;
