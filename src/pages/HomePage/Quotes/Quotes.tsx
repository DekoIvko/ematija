import { useState } from "react";
import { GetQuotesService } from "../../../services/QuotesService";
import { Lists, Loader, Pagination } from "../../../components";
import withCommentsLogic from "../../../hooks/withCommentsLogic";

import { useFetchQuery } from "../../../hooks/useFetchQuery";
import { useErrorBoundary } from "react-error-boundary";

const Quotes = ({ onClickComments }: any) => {
  console.log("Component Quotes");
  const { showBoundary } = useErrorBoundary();

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isError, error, isLoading } = useFetchQuery(
    GetQuotesService,
    "quotes"
  );

  if (isLoading) {
    <Loader />;
  }
  if (isError) {
    showBoundary(error);
  }

  return (
    <div className="flex flex-col">
      {data?.data ? (
        <>
          <Lists
            type="quote"
            data={data?.data}
            onClickItem={onClickComments}
            currentPage={currentPage}
          />
          <Pagination
            currentPage={currentPage}
            total={data?.data?.length}
            limit={10}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : (
        <p>No quotes to display!</p>
      )}
    </div>
  );
};
export default withCommentsLogic(Quotes);
