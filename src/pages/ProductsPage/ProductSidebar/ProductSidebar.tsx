import { useAppSelector } from "../../../store/hooks";

interface IProps {
  categories: string[];
  onSearch: Function;
}

const ProductSidebar = ({ categories, onSearch }: IProps) => {
  const appSettings = useAppSelector((state) => state.appSettings);

  return (
    <div
      className={`container p-4 m-2 max-w-[300px] rounded ${
        appSettings.appTheme === "dark"
          ? "text-slate-200 bg-gray-800"
          : "text-slate-800 bg-gray-200"
      }`}
    >
      <nav className="">
        <ul className="flex flex-col gap-2 w-full ">
          <h1 className="text-2xl">Filters</h1>
          <li
            className="list-group-item"
            onChange={(event: React.ChangeEvent<HTMLLIElement>) =>
              onSearch("search", event.target.value)
            }
          >
            <input
              type="text"
              className="w-full rounded bg-slate-200 text-slate-800 p-1"
              placeholder="Search..."
            />
          </li>
        </ul>
        <ul className="list-group flex flex-col gap-2 w-full">
          <li key="all" className="pt-2">
            <button
              type="button"
              className="btn btn-link m-0 p-0"
              onClick={(e) => onSearch("category", "all")}
            >
              All
            </button>
          </li>
          {categories?.map((category: string) => {
            return (
              <li key={category} className="">
                <button
                  type="button"
                  className="btn btn-link m-0 p-0"
                  onClick={(e) => onSearch("category", category)}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ProductSidebar;
