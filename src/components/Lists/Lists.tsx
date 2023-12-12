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
  return (
    <div className="list flex flex-col">
      {data
        ?.slice(currentPage - 1, currentPage + 10)
        .map((item: any, index: number) => {
          return (
            <div
              className="list-item flex flex-col gap-2"
              key={item?.id + "_" + index}
              onClick={(e) => onClickItem(type, e)}
            >
              <div className="list-text flex p-3">
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
