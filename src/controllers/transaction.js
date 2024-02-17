const { Op, Sequelize } = require("sequelize");
const TransactionService = require("../services/transaction")

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateTransaction = () => {
    const transactions = [
        {
            sender: 'Alice',
            receiver: 'Bob',
            amount: 100,
            currency: 'USD',
            cause: 'Payment',
            createdAt: randomDate(new Date(2022, 0, 1), new Date()),
        },
        {
            sender: 'Bob',
            receiver: 'Alice',
            amount: 50,
            currency: 'EUR',
            cause: 'Payment',
            createdAt: randomDate(new Date(2022, 0, 1), new Date()),
        },
        // Add more sample transactions as needed
    ];
    return transactions[Math.floor(Math.random() * transactions.length)];
};

const addTransactionsBulk = async () => {
    try {
        const transactions = Array.from({ length: 30 }, generateTransaction);

        return await new TransactionService().createSampleTransactions(transactions);
    } catch (err) {
        throw new Error(err);
    }
}

const getAllTransactions = async () => {
    return new TransactionService().getAllTransactions();
}

const getTransactions = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const query = {
        limit,
        offset,
        order: [['createdAt', 'DESC']]
    };

    try {
        const allTransactions = await new TransactionService().getTransactions(query);

        if ((allTransactions).count > 0) {
            return res.status(200).json({ message: "successful", data: allTransactions })
        } else {
            return res.status(404).json({ message: "no results found", data: null })
        }
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong", data: null })
    }
}

const searchTransactions = async (req, res) => {
    const { page = 1, param } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const query = {
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        where: {
            [Op.or]: [
                { transactionID: { [Op.like]: `%${param}%` } },
                { sender: { [Op.like]: `%${param}%` } },
                { receiver: { [Op.like]: `%${param}%` } },
                { cause: { [Op.like]: `%${param}%` } }
            ],
        },
    };

    try {
        const allTransactions = await new TransactionService().searchTransactions(query);

        if ((allTransactions).count > 0) {
            return res.status(200).json({ message: "successful", data: allTransactions })
        } else {
            return res.status(404).json({ message: "no results found", data: null })
        }
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong", data: null })
    }
}

module.exports = {
    getAllTransactions,
    getTransactions,
    addTransactionsBulk,
    searchTransactions
}