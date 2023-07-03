import ticketModel from'../../schemas/ticket.model.js'

export class TicketsMongoDao {
    
    async getTickets() {
        const tickets = await ticketModel.find().lean()
        return tickets
    }

     async getTicketById(tid) {
        const ticket = await ticketModel.findById(tid).lean()
        return ticket
    }

    async createTicket(payload) {
        const newTicket = await ticketModel.create(payload)
        return newTicket
    }

    async updateTicketById(tid, payload) {
        const updatedTicket = await ticketModel.updateOne({_id: tid}, payload)
        return updatedTicket
    }

    async deleteTicket(tid) {
        const deletedTicket = await ticketModel.deleteOne({_id: tid})
        return deletedTicket   
    }

}