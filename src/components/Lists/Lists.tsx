import { memo } from "react";
import { ITodos } from "../../interfaces/ITodos";
import { IQuotes } from "../../interfaces/IQuotes";

import "./Lists.scss";

interface IProps {
  type: string;
  data: ITodos[] | IQuotes[];
  onClickItem: Function;
  currentPage: number;
}

const Lists = memo(({ type, data, onClickItem, currentPage }: IProps) => {
  console.log(type);
  console.log(data);
  return (
    <div className="list d-flex flex-column">
      {data
        ?.slice(currentPage, currentPage + 10)
        .map((item: any, index: number) => {
          return (
            <div
              className="list-item d-flex flex-column gap-2"
              key={item?.id + "_" + index}
              onClick={(e) => onClickItem(type, e)}
            >
              <div className="list-text d-flex p-3">
                {type === "quote" ? item?.quote : item?.todo}
              </div>
              <div className="list-author">
                <span>{type === "quote" ? item?.author : item?.completed}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
});

export default Lists;
