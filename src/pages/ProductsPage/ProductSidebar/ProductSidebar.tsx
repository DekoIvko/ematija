import { Button } from "react-bootstrap";
import NewProductModal from "../NewProductModal/NewProductModal";
import "./ProductSidebar.scss";

interface IProps {
  categories: string[];
  onSearch: Function;
  onCategory: Function;
}

const ProductSidebar = ({ categories, onSearch, onCategory }: IProps) => {
  return (
    <div className="container product-sidebar-menu">
      <nav className="navigation-bar d-flex flex-column">
        <ul className="list-group d-flex flex-column gap-2 w-100 list-inputs">
          <li className="list-group-item">
            <NewProductModal categories={categories} />
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
        <ul className="list-group d-flex flex-column gap-2 w-100 list-categories">
          <li key="all">
            <Button
              type="button"
              className="btn btn-link m-0 p-0"
              onClick={(e) => onCategory(e, "all")}
            >
              All
            </Button>
          </li>
          {categories?.map((category: string) => {
            return (
              <li key={category}>
                <Button
                  type="button"
                  className="btn btn-link m-0 p-0"
                  onClick={(e) => onCategory(e, category)}
                >
                  {category}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ProductSidebar;
