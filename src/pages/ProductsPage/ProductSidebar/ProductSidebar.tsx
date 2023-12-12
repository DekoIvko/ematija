import { Link } from "react-router-dom";
import { EHeaderNavItems } from "../../../enums/EHeaderNavItems";
import "./ProductSidebar.scss";

interface IProps {
  categories: string[];
  onSearch: Function;
  onCategory: Function;
}

const ProductSidebar = ({ categories, onSearch, onCategory }: IProps) => {
  return (
    <div className="container product-sidebar-menu">
      <nav className="navigation-bar flex flex-col">
        <ul className="list-group flex flex-col gap-2 w-100 list-inputs">
          <li className="list-group-item">
            <Link
              className="px-2 py-1 bg-red-400 bg-white hover:bg-red-600"
              to={EHeaderNavItems.newProducts}
            >
              Home
            </Link>
          </li>
          <div>Filters</div>
          <li
            className="list-group-item"
            onChange={(event: React.ChangeEvent<HTMLLIElement>) =>
              onSearch(event.target.value)
            }
          >
            <input type="text" placeholder="Search..." />
          </li>
        </ul>
        <ul className="list-group flex flex-col gap-2 w-100 list-categories">
          <li key="all">
            <button
              type="button"
              className="btn btn-link m-0 p-0"
              onClick={(e) => onCategory(e, "all")}
            >
              All
            </button>
          </li>
          {categories?.map((category: string) => {
            return (
              <li key={category}>
                <button
                  type="button"
                  className="btn btn-link m-0 p-0"
                  onClick={(e) => onCategory(e, category)}
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
