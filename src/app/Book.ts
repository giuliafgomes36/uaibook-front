export interface Book {
    id?: number,
    name?: string,
    isbn?: string,
    author?: string,
    year?: number,
    categories?: Array<string>,
    amount?: number,
    publisher?: string
}