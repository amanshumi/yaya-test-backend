const db = require("../config/db");
const sequelize = require("sequelize");

const Transaction = db.define("transaction", {
    transactionID: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4(),
        primaryKey: true,
        allowNull: false
    },
    sender: {
        type: sequelize.STRING,
        allowNull: false,
    },
    receiver: {
        type: sequelize.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize.DOUBLE,
        allowNull: false,
    },
    currency: {
        type: sequelize.STRING,
        allowNull: false,
    },
    cause: {
        type: sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Transaction;