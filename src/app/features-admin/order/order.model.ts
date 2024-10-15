export interface Order {
    invoiceNumber: string
    buyerUsername: string
    totalProduct: number
    totalPrice: number
    orderDate: string
}

export interface OrderDetail {
    productId: number
    productName: string
    productPrice: number
    quantity: number
    unitPrice: number
    imgSrc: string
}