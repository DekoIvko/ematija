import { useState } from "react";
// import Dropdown from "react-bootstrap/Dropdown";

interface IProps {
  titleBtn: string;
  menuItems: any;
  onClickItem: any;
}

const Dropdowns = ({ titleBtn, menuItems, onClickItem }: IProps) => {
  const [itemTitleBtn, setItemTitleBtn] = useState<String>("");
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {itemTitleBtn ? itemTitleBtn : titleBtn}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        {menuItems?.map((item: string, index: number) => {
          return (
            <div className="py-1" role="none" key={`${item}_${index}`}>
              {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700"  */}
              <div
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-0"
              >
                {item}
              </div>
              <form method="POST" action="#" role="none">
                <button
                  type="submit"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                  role="menuitem"
                  id="menu-item-3"
                  onClick={() => {
                    setItemTitleBtn(item);
                    onClickItem(item);
                  }}
                >
                  {item}
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>

    // <Dropdown>
    //   <Dropdown.Toggle variant="success" id="dropdown-basic">
    //     {itemTitleBtn ? itemTitleBtn : titleBtn}
    //   </Dropdown.Toggle>

    //   <Dropdown.Menu>
    //     {menuItems?.map((item: string, index: number) => {
    //       return (

    //       );
    //     })}
    //   </Dropdown.Menu>
    // </Dropdown>
  );
};

export default Dropdowns;
//         <Dropdown.Item
//           key={`${item}_${index}`}
//           onClick={() => {
//             setItemTitleBtn(item);
//             onClickItem(item);
//           }}
//         >
//           {item}
//         </Dropdown.Item>
