import { Product } from "./product"

export class CartItem {
    public id: string
    public name: string
    public imageUrl: string
    public unitPrice: number
    public amount: number

    constructor(p: Product) {
        this.id = p.id
        this.name = p.name
        this.imageUrl = p.imageUrl
        this.unitPrice = p.unitPrice
        this.amount = 1
    }
}
