export class GetTicketDTO {
    constructor(payload){
        this.code = payload.code
        this.date = payload.purchase_datetime
        this.amount = payload.amount
        this.purchaser = payload.purchaser
        this.products = payload.products
    }
}

export class AddTicketDTO {
    constructor(purchaser, amount, products){
        this.products = products
        this.purchaser = purchaser.email
        this.amount = amount
        this.purchase_datetime = new Date()
        this.code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
}