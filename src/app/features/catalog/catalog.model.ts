export interface Catalog {
    id: number
    name: string
    price: number
}

export interface CatalogDetail {
    id: number
    name: string
    categoryName: string
    price: number
    stock: number
    description: string
}