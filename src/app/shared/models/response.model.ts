export interface ResponseModel<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: string[];
}

export interface Pagination<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
}