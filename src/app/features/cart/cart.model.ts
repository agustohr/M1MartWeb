export interface Cart {
    id: number
    productName: string
    buyerUsername: string
    quantity: number
}

export interface AddCart {
  productId: number
  quantity: number
  buyerUsername: string
}

export interface CartUser {
  id: number
  product: {
    productId: number
    productName: string
    price: number
  },
  quantity: number
  checked: boolean
  image?: string
}

export interface CheckoutCart {
  buyerUsername: string
  orderDetails: DetailOrder[]
  totalProduct: number
  totalPrice: number
}

export interface DetailOrder {
  cartId: number
  productId: number
  quantity: number
  unitPrice: number
}