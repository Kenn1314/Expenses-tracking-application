const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: Number, required: true }, // 1 : INCOME, 0 : EXPENSES
    amount: { type: Number, required: true},
    Date: { type: Number, required: true},
});

const Transaction = mongoose.model("Transaction", transactionSchema, "transaction");

module.exports = Transaction;