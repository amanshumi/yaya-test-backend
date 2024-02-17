const express = require("express");
const { getTransactions, searchTransactions } = require("../controllers/transaction");

const router = express.Router();

router.get("/get", getTransactions)
router.get("/search", searchTransactions)

module.exports = router;