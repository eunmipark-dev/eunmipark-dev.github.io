import { navigate } from 'gatsby';

interface PaginationProps {
  perPage: number;
  totalCount: number;
}

export interface paginationController {
  currentPage: number;
  lastPage: number;
  indexOfLastItem: number;
  indexOfFirstItem: number;
  first: () => void;
  prev: () => void;
  next: () => void;
  last: () => void;
}

const usePagination = ({ perPage, totalCount }: PaginationProps): paginationController => {
  const search = new URLSearchParams(location.search);
  const currentPage = search.has('page') && Number(search.get('page')) ? Number(search.get('page')) : 1;
  const lastPage = Math.ceil(totalCount / perPage);
  const updatePage = (newPage: number) => {
    if (currentPage !== newPage) {
      search.set('page', newPage.toString());
      navigate(`${location.pathname}?${search.toString()}`);
    }
  };

  const handleFirst = () => {
    updatePage(1);
  };

  const handlePrev = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    updatePage(prevPage);
  };

  const handleNext = () => {
    const nextPage = Math.min(currentPage + 1, lastPage);
    updatePage(nextPage);
  };

  const handleLast = () => {
    updatePage(lastPage);
  };

  return {
    currentPage,
    lastPage,
    indexOfLastItem: currentPage * perPage,
    indexOfFirstItem: currentPage * perPage - perPage,
    first: handleFirst,
    prev: handlePrev,
    next: handleNext,
    last: handleLast,
  };
};

export default usePagination;
