import { useSearchParams } from 'react-router';
import styles from './Pagination.module.css';
import type { IPagination } from './types';
import { Fragment } from 'react/jsx-runtime';
import Button from '../common/Button';

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
          <Button
            onClick={() => onChange(currentPage > 1 ? currentPage - 1 : 1)}
          >
            &laquo;
          </Button>
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
                <Button
                  className={
                    page === currentPage ? styles.page__current : undefined
                  }
                  onClick={() => onChange(page)}
                >
                  {page}
                </Button>
              </Fragment>
            );
          })}
        <li>
          <Button
            onClick={() =>
              onChange(
                currentPage < pagesArray.length
                  ? currentPage + 1
                  : pagesArray.length
              )
            }
          >
            &raquo;
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
