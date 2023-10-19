import { useState } from "react";
import { GetQuotesService } from "../../../services/QuotesService";
import { IQuotes } from "../../../interfaces/IQuotes";
import { Lists, Loader, Pagination, StatusMessage } from "../../../components";
import withCommentsLogic from "../../../hooks/withCommentsLogic";
import { useQuery } from "@tanstack/react-query";

import "./Quotes.scss";

const Quotes = ({ onClickComments }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["quotes"],
    queryFn: GetQuotesService,
    select(data) {
      return data.data;
    },
  });

  if (isSuccess) {
    // console.log(data);
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isError && error instanceof Error) {
    console.log(error);
    return (
      <StatusMessage
        from="quotes"
        status="error"
        message={error?.message || ""}
      />
    );
  }

  return (
    <div className="quotes d-flex flex-column">
      {data?.quotes ? (
        <>
          <Lists
            type="quote"
            data={data?.quotes}
            onClickItem={onClickComments}
            currentPage={currentPage}
          />
          <Pagination
            currentPage={currentPage}
            total={data?.quotes?.length}
            limit={10}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : null}
    </div>
  );
};

export default withCommentsLogic(Quotes);
