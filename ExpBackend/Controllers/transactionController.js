const transactionModel = require("../Models/transactionModel.js");

const createTransaction = async (req, res) => {
    try {
        let date = req.body.date;
        let title = req.body.title;
        let type = req.body.type;
        let amount = req.body.amount;

        let newTransaction = new transactionModel({
            Date: date,
            title: title,
            type: type,
            amount: amount,
        })

        newTransaction.save();

        return res.json({ status: "ok", msg: "New transaction created successfully" });

    } catch (err) {
        console.log("Error creating transaction : " + err);
        return res.json({ status: "err", msg: "Error creating new transaction !" })
    }
}

const selectAllTransactionList = async (req, res) => {
    try {
        let allTransaction = await transactionModel.find({});
        // console.log(allTransaction)

        return res.json({ status: "ok", msg: "Successfully get all transaction", data: allTransaction });
    } catch (err) {
        console.log(err);
        return res.json({ status: "err", msg: "Error selecting transaction list" });
    }
}

const selectSpecificTransaction = async (req, res) => {
    let id = req.body.id;

    if (id !== "" || id) {

        let transaction = await transactionModel.findById({ _id: id });
        // console.log(transaction)

        return res.json({ status: "ok", msg: "Successfully get transaction info", data: [transaction] })

    } else {
        console.log(err);
        return res.json({ status: "err", msg: "Error retrieving transaction info" })
    }
}

const updateTransactionInfo = async (req, res) => {

    try {
        let id = req.body.id;
        let title = req.body.title;
        let type = req.body.type;
        let amount = req.body.amount;
        let date = req.body.date;
        console.log("id: " + id + " title: " + title + " type: " + type + " amount: " + amount + " date: " + date);

        // let updateTransaction = await transactionModel.findByIdAndUpdate(id, {title: title, type: type, amount: amount, Date: date}, {new: true}, (err, updatedRec) => {
        //     if(err) {
        //         return res.json({status: "err", msg: "Error updating transaction info"});
        //     } else {
        //         console.log(updatedRec)
        //         return res.json({status: "ok", msg: "Successfully update transaction info"});
        //     }
        // });
        let updateTransaction = await transactionModel.findByIdAndUpdate(id, {title: title, type: type, amount: amount, Date: date}, {new: true}).then((updatedRec) => {
            console.log(updatedRec)
            return res.json({status: "ok", msg: "Successfully update transaction info"});
        }).catch((err) => {
            console.log(err)
            return res.json({status: "err", msg: "Error updating transaction info"});
        });

    } catch (err) {
        console.log(err);
        return res.json({ status: "err", msg: "Error updating transaction info" });
    }
}

const deleteTransaction = async (req, res) => {
    try {
        let id = req.body.id;
        console.log(id);

        await transactionModel.findByIdAndDelete(id).then((deletedRec) => {
            console.log(deletedRec);
            return res.json({status: "ok", msg: "Successfully deleted transaction"});
        }).catch((err) => {
            console.log(err);
            return res.json({status: "err", msg: "Error deleting transaction"})
        })
    } catch (err) {
        console.log(err);
        return res.json({ status: "err", msg: "Error deleting transaction" });
    }
}

module.exports = {
    createTransaction,
    selectAllTransactionList,
    selectSpecificTransaction,
    updateTransactionInfo,
    deleteTransaction,
}