import { useState } from "react";
import { ENavigationItems } from "../../enums/ENavigationItems";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";
import Messenger from "./Messenger/Messenger";

import Feed from "./Feed/Feed";
import Quotes from "./Quotes/Quotes";
import Todos from "./Todos/Todos";

import "./HomePage.scss";

const HomePage = () => {
  console.log("Components HomePage");
  const [page, setPage] = useState("feed");

  return (
    <div className="container-fluid flex flex-row gap-2">
      <aside
        id="navigation-menu"
        className="md:min-w-[250px] sm:min-w-[150px] bg-gray-800 m-2 rounded"
      >
        <NavigationMenu page={page} setPage={setPage} />
      </aside>
      <section id="section" className="w-full">
        {page === ENavigationItems.feed ? (
          <Feed feedType="home-page" />
        ) : page === ENavigationItems.quotes ? (
          <Quotes />
        ) : page === ENavigationItems.todos ? (
          <Todos />
        ) : null}
      </section>
      <aside
        id="messenger-users"
        className="md:min-w-[240px] sm:min-w-[140px] bg-gray-800 m-2 rounded"
      >
        <Messenger />
      </aside>
    </div>
  );
};

export default HomePage;
