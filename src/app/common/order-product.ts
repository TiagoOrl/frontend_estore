export class OrderProduct {
    constructor(
        public amount: number,
        public fkProductId: number,
        public fkOrderId: number
    ) {}
}
