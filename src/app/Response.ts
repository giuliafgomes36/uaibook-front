export interface Response<T> {
    errors?: string[],
    data: T
}