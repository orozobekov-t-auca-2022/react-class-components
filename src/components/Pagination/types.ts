export interface IPagination {
  currentPage: number,
  pagesArray: number[],
  onChange: (actualPage: number) => void
}