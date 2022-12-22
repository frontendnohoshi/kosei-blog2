{
  /* FIXME 検索機能などを利用したときにactiveページが1に戻るようにしたい */
}

import { VFC } from "react";
import { Dispatch, memo, SetStateAction, useState } from "react";
import ReactPaginate from "react-paginate";
import { getDebugger } from "src/components/utils/Debugger";

type PaginationProps = {
  itemsPerPage: number;
  setItemOffset: Dispatch<SetStateAction<number>>;
  itemCount: number;
};

const debug = getDebugger(true);

const Pagination: VFC<PaginationProps> = memo(({ itemsPerPage, setItemOffset, itemCount }) => {
  debug("Pagination is rendering");

  const pageCount = Math.ceil(itemCount / itemsPerPage);
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % itemCount;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setItemOffset(newOffset);
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageCount={pageCount}
        previousLabel="<"
        containerClassName={"pagination"}
        activeClassName={"pagination__active"}
        disabledClassName={"pagination__disabled"}
      />
    </div>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
