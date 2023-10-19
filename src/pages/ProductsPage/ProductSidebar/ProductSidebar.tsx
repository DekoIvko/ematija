import "./ProductSidebar.scss";

interface IProps {
  categories: string[];
  onSearch: Function;
  onCategory: Function;
}

const ProductSidebar = ({ categories, onSearch, onCategory }: IProps) => {
  return (
    <div className="container product-sidebar-menu">
      <div>Filters</div>
      <nav className="navigation-bar d-flex flex-column">
        <ul className="list-group d-flex flex-column gap-2 w-100 list-inputs">
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
          {categories.map((category: string) => {
            return (
              <li key={category}>
                <a onClick={() => onCategory(category)}>{category}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ProductSidebar;
