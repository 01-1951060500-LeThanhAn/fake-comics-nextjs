import { Pagination } from "antd";
import React from "react";

interface PaginationPage {
  page: number;
  setPage: (page: number) => void;
  countPages: number;
}

const Paginations: React.FC<PaginationPage> = ({
  page,
  setPage,
  countPages,
}) => {
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <div className="mx-auto text-center">
        <Pagination
          defaultCurrent={page}
          total={countPages}
          onChange={handleChangePage}
          current={page}
        />
      </div>
    </>
  );
};

export default Paginations;
