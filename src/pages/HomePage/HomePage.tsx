import { useState } from "react";
import { ENavigationItems } from "../../enums/ENavigationItems";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";
import Messenger from "./Messenger/Messenger";

import { useAppSelector } from "../../store/hooks";
import Feed from "./Feed/Feed";
import Quotes from "./Quotes/Quotes";
import Todos from "./Todos/Todos";

const HomePage = () => {
  console.log("Components HomePage");
  const [page, setPage] = useState("feed");
  const appSettings = useAppSelector((state) => state.appSettings);

  return (
    <div className="container-fluid flex flex-row gap-2">
      <aside
        id="navigation-menu"
        className={`md:min-w-[250px] sm:min-w-[150px] m-2 rounded ${
          appSettings.appTheme === "dark"
            ? "text-slate-200 bg-gray-800"
            : "text-slate-800 bg-gray-200"
        } `}
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
        className={`md:min-w-[240px] sm:min-w-[140px] m-2 rounded ${
          appSettings.appTheme === "dark"
            ? "text-slate-200 bg-gray-800"
            : "text-slate-800 bg-gray-200"
        } `}
      >
        <Messenger />
      </aside>
    </div>
  );
};

export default HomePage;
