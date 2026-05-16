import styles from './Pagination.module.css';
import type { IPagination } from './types';

const Pagination = ({currentPage, pagesArray, onChange}: IPagination) => {
  const getVisiblePages = (
    totalPages: number[],
    currentPage: number
  ) => {
    const delta = 2;

    return totalPages.filter((page) => {
      return (
        page === 1 ||
        page === totalPages.length ||
        (page >= currentPage - delta &&
          page <= currentPage + delta)
      );
    });
  };

  const current = Number(currentPage);

  const visiblePages = getVisiblePages(
    pagesArray,
    current
  );

  return(
    <nav aria-label='pagination' className={styles.paginationWrapper}>
      <ul className={styles.pagination}>
        <li>
          <button onClick={() => current > 0 ? onChange(current - 1) : onChange(pagesArray.length)}>
            &laquo;
          </button>
        </li>
        {
	      (visiblePages.length > 0) && visiblePages.map((page, index) => {
            const prevPage = visiblePages[index - 1];
            return <li
              key={page}
            >
                {prevPage && page - prevPage > 1 && (
                    <li>
                    <span>...</span>
                </li>
                )}
              <button
                className={page === current ? styles.page__current : undefined}
              >
                {page}
              </button>
            </li>
            })
	    }
        <li>
          <button onClick={() => current < pagesArray.length ? onChange(current + 1) : onChange(1)}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  )
};

export default Pagination;
