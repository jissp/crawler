interface IPagination {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export function toPagination({
    page,
    pageSize,
    count,
}: {
    page: number;
    pageSize: number;
    count: number;
}): IPagination {
    return {
        currentPage: page,
        pageSize,
        totalCount: count,
        totalPages: Math.ceil(count / pageSize),
    };
}
