const express = require("express");
const router = express.Router();
const {
    createTransaction,
    selectAllTransactionList,
    selectSpecificTransaction,
    updateTransactionInfo,
    deleteTransaction
} = require('../Controllers/transactionController');

router.post('/selectSpecificTrans', selectSpecificTransaction);
router.post('/createTransaction', createTransaction);
router.post('/updateSpecificTrans', updateTransactionInfo);
router.get('/selectTransactions', selectAllTransactionList);
router.post('/deleteTransaction', deleteTransaction)

module.exports = router;