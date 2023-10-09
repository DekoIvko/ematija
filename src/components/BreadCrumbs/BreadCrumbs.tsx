import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();

  let currentLink: string = "";

  const crumbs = location.pathname
    ?.split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb: string) => {
      currentLink += `/${crumb}`;

      return (
        <div className="crumb" key={crumb}>
          <NavLink to={currentLink}>{crumb}</NavLink>
        </div>
      );
    });
  return <div>{crumbs}</div>;
};

export default BreadCrumbs;
