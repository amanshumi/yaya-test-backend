const Transaction = require("../entities/transaction");

class TransactionService {
    
    async getTransactions(query) {
        return await Transaction.findAndCountAll(query)
    }

    async searchTransactions(query) {
        return await Transaction.findAndCountAll(query)
    }

    async getAllTransactions() {
        return await Transaction.findAndCountAll();
    }

    async createSampleTransactions(data) {
        return await Transaction.bulkCreate(data);
    }

}

module.exports = TransactionService;