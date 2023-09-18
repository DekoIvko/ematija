import React from "react";

import "./Pagination.scss";

interface IProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: any;
}

const PaginationItem = ({
  page,
  currentPage,
  onPageChange,
  isDisabled,
}: any) => {
  return (
    <li
      className={`page-item ${page === currentPage ? "active" : ""}${
        isDisabled ? " disabled" : ""
      }`}
      onClick={() => onPageChange(page)}
    >
      <span className="page-link test">{page}</span>
    </li>
  );
};

const Pagination = ({ currentPage, total, limit, onPageChange }: IProps) => {
  const range = (start: any, end: any) => {
    return [...Array(end).keys()].map((el) => el + start);
  };
  const pageCount = Math.ceil(total / limit);
  const pages = range(1, pageCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages.length;
  return (
    <ul className="pagination d-flex justify-content-center">
      <PaginationItem
        page="First"
        currentPage={currentPage}
        onPageChange={() => onPageChange(1)}
        isDisabled={isFirstPage}
      />
      <PaginationItem
        page="Prev"
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage - 1)}
        isDisabled={isFirstPage}
      />
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
      <PaginationItem
        page="Next"
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage + 1)}
        isDisabled={isLastPage}
      />
      <PaginationItem
        page="Last"
        currentPage={currentPage}
        onPageChange={() => onPageChange(pages.length)}
        isDisabled={isLastPage}
      />
    </ul>
  );
};

export default Pagination;
