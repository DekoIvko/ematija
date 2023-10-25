import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

interface IProps {
  titleBtn: string;
  menuItems: any;
  onClickItem: any;
}

const Dropdowns = ({ titleBtn, menuItems, onClickItem }: IProps) => {
  const [itemTitleBtn, setItemTitleBtn] = useState<String>("");
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {itemTitleBtn ? itemTitleBtn : titleBtn}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {menuItems?.map((item: string, index: number) => {
          return (
            <Dropdown.Item
              key={`${item}_${index}`}
              onClick={() => {
                setItemTitleBtn(item);
                onClickItem(item);
              }}
            >
              {item}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Dropdowns;
