import {useEffect, useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { consoleGet } from '../utils/general';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { Link, useRouter, useLocalSearchParams} from 'expo-router';
import { updateTransactionInfo, deleteTransaction } from '../_Controllers/transactionController';

export default function editTransaction () {
    const today = new Date();
    const router = useRouter();

    const params  = useLocalSearchParams();
    const [date, setDate] = useState(new Date(today.setHours(0, 0, 0, 0)));
    const [title, setTitle] = useState("");
    const [type, setType] = useState(0);
    const [amount, setAmount] = useState(0);

    const show = false;

    function handleDateSelectChange(event, selectedDate) {
        // consoleGet("event: " + event, show);
        // consoleGet("selectedDate: " + selectedDate.getTime(), show);

        let newDate = new Date(selectedDate.setHours(0, 0, 0, 0));
        let newSelectedDate = Math.floor(newDate.getTime() / 1000);
        consoleGet("newSelectedDate: " + newSelectedDate, show);

        setDate(newDate)
    }

    function clickIncome() {

        if(type == 0) {
            setType(1);
        }
    }

    function clickExpenses() {

        if(type == 1) {
            setType(0);
        }
    }

    async function handleSubmit() {

        if (title !== "" && amount !== "") {
            let data = {
                date: date instanceof Date ? Math.floor(date.getTime() / 1000) : date,
                title: title,
                type: type,
                amount: amount,
                id: params.id
            }

            let result = await updateTransactionInfo(data);
            consoleGet("result: " + JSON.stringify(result), show);
            
            if (result && result?.status == "ok" && result?.msg == "Successfully update transaction info") {

                // Alert.alert('Success', result.msg, [
                //     { text: 'Back', onPress: () => {
                //         router.back();
                //     }},
                //     {
                //         text: "New", onPress: () => {
                //             setDate(new Date(today.setHours(0, 0, 0, 0)));
                //             setTitle("");
                //             setAmount(0);
                //         }
                //     }
                // ]);
                router.back();

            } else {
                Alert.alert(result.msg ? result.msg : "Error updating transaction info !")
            }

        } else {
            Alert.alert("Title and amount are required !")
        }
    }

    async function handleDelete() {
        let data = {
            id: params.id
        };

        let result = await deleteTransaction(data);

        if(result && result?.status == "ok" && result?.msg == "Successfully deleted transaction") {
            router.back();
        } else {
            Alert.alert(result.msg ? result.msg : "Error deleting transaction info !")
        }
    }

    async function retrieveSelectedTrans() {
        // let data = {
        //     id: params.id
        // }
        // consoleGet("data: " + JSON.stringify(data), show);

        // let result = await selectTransaction(data);
        // consoleGet("result: " + JSON.stringify(result), show);

        // if(result.status == "ok" && result.data.length > 0) {
        //     let title_ = result.data[0].title.trim();
        //     let type_  = result.data[0].type;
        //     let amount_ = result.data[0].amount;
        //     let date_  = result.data[0].Date;
        //     consoleGet("title_: " + title_ + " type_: " + type_ + " amount_: " + amount_, show)

        //     setTitle(title_)
        //     setType(type_)
        //     setAmount(String(amount_))

        // }
        let title_ = params.title.trim();
        let type_  = params.type;
        let amount_ = params.amount;
        let date_ = params.date;
        date_ = date_.length == 10 ? date_ + "000" : date_;

        let dateObj = new Date(parseInt(date_));
        // let newDateObj = new Date(dateObj.setHours(0,0,0,0));

        consoleGet(dateObj, show)
        consoleGet("title_: " + title_ + " type_: " + type_ + " amount_: " + amount_, show)

        setTitle(title_)
        setType(type_)
        setAmount(String(amount_))
        setDate(dateObj)
    }

    useEffect(() => {
        retrieveSelectedTrans();
    }, [params.id]);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, marginTop: 20 }}>

                    <View style={styles.subcontainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Date </Text>
                        </View>

                        <View style={[styles.inputContaier, { alignItems: 'flex-start', justifyContent: "center" }]}>

                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(e, date) => { handleDateSelectChange(e, date) }}
                                style={{ marginLeft: 1 }}
                            />

                        </View>
                    </View>

                    <View style={styles.subcontainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Title </Text>
                        </View>

                        <View style={styles.inputContaier}>
                            <TextInput
                                style={styles.input}
                                value={title}
                                keyboardType="ascii-capable"
                                onChangeText={(text) => {
                                    setTitle(text);
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.subcontainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Type </Text>
                        </View>

                        <View style={[styles.inputContaier, { alignItems: 'flex-start', justifyContent: "center" }]}>
                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                <TouchableOpacity style={{ marginRight: 5, borderColor: type == 1 ? "blue" : "black", borderWidth: 2, padding: 5, borderRadius: 5 }}
                                    onPress={() => {
                                        clickIncome();
                                    }}
                                >
                                    <Text>Income</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginRight: 5, borderColor: type == 0 ? "red" : "black", borderWidth: 2, padding: 5, borderRadius: 5 }}
                                    onPress={() => {
                                        clickExpenses();
                                    }}
                                >
                                    <Text>Expenses</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.subcontainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Amount </Text>
                        </View>

                        <View style={styles.inputContaier}>
                            <TextInput
                                style={styles.input}
                                value={amount}
                                keyboardType="decimal-pad"
                                onChangeText={(text) => {
                                    setAmount(text)
                                }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={{ color: "green" }}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteButton}
                        onPress={handleDelete}
                    >
                        <Text style={{ color: "red" }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6A9C89',
        flex: 1,
    },
    subcontainer: {
        flexDirection: "row",
        marginBottom: 1,
        height: 50,
    },
    labelContainer: {
        width: "30%",
        backgroundColor: "#E9EFEC",
        justifyContent: "center",
        alignContent: "center"
    },
    label: {
        fontSize: 20,
        marginLeft: 5
    },
    inputContaier: {
        width: "70%",
        backgroundColor: "#F5F7F8",
        alignItems: "center"
    },
    input: {
        flex: 1,
        fontSize: 20,
        width: "95%",
    },
    submitButton: {
        marginTop: 50,
        height: 50,
        backgroundColor: "#E9EFEC",
        borderColor: "black",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    deleteButton: {
        marginTop: 5,
        height: 50,
        backgroundColor: "#E9EFEC",
        borderColor: "black",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
})