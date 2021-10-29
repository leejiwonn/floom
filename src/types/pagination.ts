export type PaginationOptions = {
  limit: number;
  page: number;
};

export type Paginated<T> = {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};
