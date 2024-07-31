export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

    return {
        "page": page,
        "perPage": perPage,
        "totalItems": count,
        "totalPages": totalPages,
        "hasPreviousPage": hasPreviousPage,
        "hasNextPage": hasNextPage
    };
    };
