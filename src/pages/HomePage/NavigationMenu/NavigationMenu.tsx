import { useUserAuthContext } from "../../../context/UserAuthContext";
import { ENavigationItems } from "../../../enums/ENavigationItems";
interface IProps {
  page: string;
  setPage: any;
}

export const NavigationMenu = ({ page, setPage }: IProps) => {
  console.log("Component NavigationMenu");
  const authUser = useUserAuthContext();

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row pl-1 md:pl-4 py-1 md:py-2">
        <img
          src={authUser?.user?.image}
          alt="User profile"
          className="rounded max-h-[50px] max-w-[50px]"
        />
        <div className="m-0 p-1 md:p-2 ">{`${authUser?.user?.firstName} ${authUser?.user?.lastName}`}</div>
      </div>
      <nav className="p-2 w-full">
        <ul className="flex flex-col gap-4 justify-center py-2">
          <li
            className="p-2 rounded hover:bg-slate-500 cursor-pointer"
            onClick={() => setPage(ENavigationItems.feed)}
          >
            <button
              className={`${
                page === "feed" ? "text-slate-400" : "text-slate-200"
              } `}
            >
              Feed
            </button>
          </li>
          <li
            className="p-2 rounded hover:bg-slate-500 cursor-pointer"
            onClick={() => setPage(ENavigationItems.quotes)}
          >
            <button
              className={`${
                page === "quotes" ? "text-slate-400" : "text-slate-200"
              } `}
            >
              Quotes
            </button>
          </li>
          <li
            className="p-2 rounded hover:bg-slate-500 cursor-pointer"
            onClick={() => setPage(ENavigationItems.todos)}
          >
            <button
              className={`${
                page === "todos" ? "text-slate-400" : "text-slate-200"
              } `}
            >
              Todos
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
