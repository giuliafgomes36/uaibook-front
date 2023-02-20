export interface Book {
    id?: number,
    name?: string,
    isbn?: string,
    authors?: string,
    year?: number,
    categories?: Array<string>,
    amount?: number,
    publisher?: string
}