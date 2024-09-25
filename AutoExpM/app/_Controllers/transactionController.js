import {apiClient} from "../utils/api";

export const handleAddTransaction = async (data) => {
    // console.log(data)

    let result = await apiClient.post('/transaction/createTransaction', {date: data.date, title: data.title, type: data.type, amount: data.amount}).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
    // console.log("handleAddTransaction (add): " + JSON.stringify(result), show);

    return result;
}

export const selectAllTransaction = async (data) => {

    let result = await apiClient.get('/transaction/selectTransactions').then((res) => {
        // console.log("success");
        // console.log(res.data);

        return res.data;
    }).catch((err) => {
        // console.log("fail")
        // console.log(err)

        return err;
    });


    return result;
}

export const selectTransaction = async (data) => {
    let result = await apiClient.post('/transaction/selectSpecificTrans', {id: data.id}).then((res) => { return res.data }).catch((err) => { return err })
    console.log(result)

    return result;
}

export const updateTransactionInfo = async (data) => {
    let result = await apiClient.post('/transaction/updateSpecificTrans', {id: data.id, title: data.title, amount: data.amount, type: data.type, date: data.date}).then((res) => { return res.data }).catch((err) => { return err });
    console.log(result);

    return result;
}

export const deleteTransaction = async (data) => {
    let result = await apiClient.post('/transaction/deleteTransaction', {id: data.id}).then((res) => { return res.data }).catch((err) => { return err });
    console.log(result);

    return result;
}