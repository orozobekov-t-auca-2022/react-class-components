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

export default getVisiblePages;
