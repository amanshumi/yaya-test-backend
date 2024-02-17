const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const transactionRoute = require("./routes/transaction");
const { getAllTransactions, addTransactionsBulk } = require("./controllers/transaction");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/transaction", transactionRoute);

db.authenticate().then((result) => {
    db.sync().then(() => {
        app.listen(process.env.PORT, async () => {
            console.log("running on port 8070");

            // Add sample transactions for test if none exists
            const transactionCheck = await getAllTransactions();

            if (transactionCheck.length < 1) {
                // insert sample txns here
                addTransactionsBulk();
            }
        })
    }).catch((err) => {
        console.error(err);
    })
})
    .catch((err) => {
        console.error(err);
    })

