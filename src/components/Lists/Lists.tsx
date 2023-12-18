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
    <div className="flex flex-col">
      {data
        ?.slice(currentPage - 1, currentPage + 10)
        .map((item: any, index: number) => {
          return (
            <div
              className="flex flex-col gap-2 bg-gray-800 p-2 m-2 rounded text-slate-200"
              key={item?.id + "_" + index}
              onClick={(e) => onClickItem(type, e)}
            >
              <div className="flex p-3 bg-gray-700 rounded-r-xl rounded-tl-xl  shadow-l">
                {type === "quote" ? item?.quote : item?.todo}
              </div>
              <div className="p-1 font-bold">
                <span>{type === "quote" ? item?.author : item?.completed}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
});

export default Lists;
