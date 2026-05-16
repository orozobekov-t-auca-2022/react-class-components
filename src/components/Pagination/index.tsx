import styles from './Pagination.module.css';

const Pagination = ({currentPage, pagesArray, onChange}: {
    currentPage: number,
    pagesArray: number[],
    onChange: (actualPage: number) => void
}) => {

  return(
    <>
      {
	    (pagesArray.length > 0) &&
	      pagesArray.map((page) => (

          <button 
            key={page}
            className={page === currentPage ? styles.page__current : undefined}
            onClick={() => onChange(page)}>
	        {page}
          </button>
        ))
	  }
    </>
  )
};

export default Pagination;
