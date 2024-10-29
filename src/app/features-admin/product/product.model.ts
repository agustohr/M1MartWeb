import { Category } from "../category/category.model"

export interface Product {
    id: number
    name: string
    category: Category
    price: number
    stock: number
    description: string
    discontinue: boolean
    image: string
}

export interface ProductParams {
  pageNumber: number
  productName: string
  categoryName: string
}