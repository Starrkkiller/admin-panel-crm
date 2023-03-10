import styles from "./Pagination.module.css";
import { Button } from "../../../../../elements/Button/Button";
import { MyDropdown } from "../../../../../elements/Dropdown/MyDropdown";
import { PageChooser } from "./PageChooser/PageChooser";
import { number } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPage } from "../../../../store/Filters/filtersSlice";
import { resetCheckedOrders } from "../../../../store/Orders/ordersSlice";

Pagination.propTypes = {
  ordersLength: number,
};

export function Pagination({ ordersLength }) {
  const { pageLimit, currentPage } = useSelector((state) => state.filters);
  const maxPage = Math.ceil(ordersLength / pageLimit);

  const dispatch = useDispatch();
  const handleChangePage = (pageNumber) => {
    dispatch(resetCheckedOrders());
    dispatch(changeCurrentPage(pageNumber));
  };

  const dropdownTrigger = <Button>#</Button>;
  const paginationButtonStyle = styles.paginationButton;
  return (
    <div className={styles._}>
      <div className={styles.wrapper}>
        {currentPage >= 4 && (
          <Button
            className={paginationButtonStyle}
            onClick={() => handleChangePage(1)}
            size="short"
            isFullWidth
          >
            1
          </Button>
        )}
        {currentPage > 4 && (
          <Button className={paginationButtonStyle} size="short" isFullWidth>
            ...
          </Button>
        )}
        {currentPage > 2 && (
          <Button
            className={paginationButtonStyle}
            onClick={() => handleChangePage(currentPage - 2)}
            size="short"
            isFullWidth
          >
            {currentPage - 2}
          </Button>
        )}
        {currentPage > 1 && (
          <Button
            className={paginationButtonStyle}
            onClick={() => handleChangePage(currentPage - 1)}
            size="short"
            isFullWidth
          >
            {currentPage - 1}
          </Button>
        )}

        <Button
          className={paginationButtonStyle}
          size="short"
          isFullWidth
          isSecondary={true}
        >
          {currentPage}
        </Button>

        {currentPage < maxPage && (
          <Button
            className={paginationButtonStyle}
            size="short"
            isFullWidth
            onClick={() => handleChangePage(currentPage + 1)}
          >
            {currentPage + 1}
          </Button>
        )}
        {currentPage < maxPage - 1 && (
          <Button
            className={paginationButtonStyle}
            size="short"
            isFullWidth
            onClick={() => handleChangePage(currentPage + 2)}
          >
            {currentPage + 2}
          </Button>
        )}
        {currentPage < maxPage - 3 && (
          <Button className={paginationButtonStyle} size="short" isFullWidth>
            ...
          </Button>
        )}
        {currentPage < maxPage - 2 && (
          <Button
            className={paginationButtonStyle}
            size="short"
            isFullWidth
            onClick={() => handleChangePage(maxPage)}
          >
            {maxPage}
          </Button>
        )}
      </div>
      <MyDropdown trigger={dropdownTrigger} childrenClassName={styles.dropdown}>
        <PageChooser maxPage={maxPage} />
      </MyDropdown>
    </div>
  );
}
