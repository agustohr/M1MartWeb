export interface Dashboard {
    userTotal: number
    categoryTotal: number
    productTotal: number
    transactionTotal: number
    incomeTotal: number
    monthlySalesTrend: MonthlySalesTrend[]
}

export interface MonthlySalesTrend {
    year: number
    month: number
    monthlySalesAmount: number
    monthlyTotalIncome: number
}