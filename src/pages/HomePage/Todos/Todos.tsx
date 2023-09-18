import React, { useState } from "react";
import { ITodos } from "../../../interfaces/ITodos";
import { Pagination } from "../../../components";

interface IProps {
  todos: ITodos[];
}

const Todos = ({ todos }: IProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="quotes d-flex flex-column">
      {todos ? (
        <>
          {todos
            .slice(currentPage, currentPage + 10)
            .map((item: ITodos, index: number) => {
              return (
                <div
                  className="quotes-item d-flex flex-column gap-2"
                  key={item?.id + "_" + index}
                >
                  <div className="quote-text d-flex p-3">{item?.todo}</div>
                  <div className="quote-author">
                    <span>{`${item?.user?.firstName} ${item?.user?.lastName}`}</span>
                  </div>
                  <div className="quote-completed">
                    <span>{item?.completed}</span>
                  </div>
                </div>
              );
            })}
          <Pagination
            currentPage={currentPage}
            total={todos?.length}
            limit={10}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Todos;
