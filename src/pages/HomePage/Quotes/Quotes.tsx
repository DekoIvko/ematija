import React, { useCallback, useEffect, useState } from "react";
import { GetQuotesService } from "../../../services/GetQuotes";
import { IQuotes } from "../../../interfaces/IQuotes";
import { Pagination } from "../../../components";

import "./Quotes.scss";

const Quotes = () => {
  const [quotes, setQuotes] = useState<IQuotes[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const getAllQuotes = useCallback(async () => {
    const allQuotes: IQuotes[] = await GetQuotesService();
    console.log(allQuotes);
    setQuotes(allQuotes);
  }, []);

  useEffect(() => {
    getAllQuotes();
  }, []);

  return (
    <div className="quotes d-flex flex-column">
      {quotes ? (
        <>
          {quotes
            .slice(currentPage, currentPage + 10)
            .map((item: IQuotes, index: number) => {
              return (
                <div
                  className="quotes-item d-flex flex-column gap-2"
                  key={item?.id + "_" + index}
                >
                  <div className="quote-text d-flex p-3">{item?.quote}</div>
                  <div className="quote-author">
                    <span>{item?.author}</span>
                  </div>
                </div>
              );
            })}
          <Pagination
            currentPage={currentPage}
            total={quotes?.length}
            limit={10}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Quotes;
