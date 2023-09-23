import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { GetQuotesService } from "../../../services/QuotesService";
import { IQuotes } from "../../../interfaces/IQuotes";
import { Loader, Pagination, StatusMessage } from "../../../components";

import "./Quotes.scss";

const Quotes = () => {
  const [quotes, setQuotes] = useState<IQuotes[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const getAllPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { status, data }: AxiosResponse = await GetQuotesService();

      if (status === 200) {
        setQuotes(data.quotes);
      } else {
        setError(data?.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="quotes d-flex flex-column">
      {loading && !error && <Loader />}
      {!loading && error && (
        <StatusMessage status="error" message={error.message} />
      )}
      {!loading && !error && quotes ? (
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
