import { useSearchParams } from 'react-router';
import styles from './Pagination.module.css';
import type { IPagination } from './types';
import { Fragment } from 'react/jsx-runtime';

const Pagination = ({ pagesArray, onChange }: IPagination) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const getVisiblePages = (totalPages: number[], currentPage: number) => {
    const delta = 2;

    return totalPages.filter((page) => {
      return (
        page === 1 ||
        page === totalPages.length ||
        (page >= currentPage - delta && page <= currentPage + delta)
      );
    });
  };

  const current = Number(page ? page : 1);

  const currentPage = !current || current < 1 ? 1 : current;

  const visiblePages = getVisiblePages(pagesArray, currentPage);

  return (
    <nav aria-label="pagination" className={styles.paginationWrapper}>
      <ul className={styles.pagination}>
        <li>
          <button
            onClick={() => onChange(currentPage > 1 ? currentPage - 1 : 1)}
          >
            &laquo;
          </button>
        </li>
        {visiblePages.length > 0 &&
          visiblePages.map((page, index) => {
            const prevPage = visiblePages[index - 1];
            return (
              <Fragment key={page}>
                {prevPage && page - prevPage > 1 && (
                  <li>
                    <span>...</span>
                  </li>
                )}
                <button
                  className={
                    page === currentPage ? styles.page__current : undefined
                  }
                  onClick={() => onChange(page)}
                >
                  {page}
                </button>
              </Fragment>
            );
          })}
        <li>
          <button
            onClick={() =>
              onChange(
                currentPage < pagesArray.length
                  ? currentPage + 1
                  : pagesArray.length
              )
            }
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
