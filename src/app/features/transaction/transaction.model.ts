export interface Transaction {
    invoiceNumber: string
    totalPrice: number
    orderDate: string
    totalProduct: number
    transactionDetails: TransactionDetail[]
    isShowDetail: boolean
}

export interface TransactionDetail {
    productId: number
    productName: string
    quantity: number
    unitPrice: number
    imgSrc: string
}