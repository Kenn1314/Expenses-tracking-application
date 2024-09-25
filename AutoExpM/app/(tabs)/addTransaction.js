import { consoleGet } from '../utils/general';
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { handleAddTransaction } from '../_Controllers/transactionController';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AddTransaction() {
    const today = new Date();
    const router = useRouter();
    const params  = useLocalSearchParams();

    const [date, setDate] = useState(new Date(today.setHours(0, 0, 0, 0)));
    const [title, setTitle] = useState("");
    const [type, setType] = useState(0);
    const [amount, setAmount] = useState(0);

    const [expensesClicked, setExpensesClicked] = useState(1);
    const [incomeClicked, setIncomeClicked] = useState(0);

    const show = true;

    function handleDateSelectChange(event, selectedDate) {
        // consoleGet("event: " + event, show);
        // consoleGet("selectedDate: " + selectedDate.getTime(), show);

        let newDate = new Date(selectedDate.setHours(0, 0, 0, 0));
        let newSelectedDate = Math.floor(newDate.getTime() / 1000);
        consoleGet("newSelectedDate: " + newSelectedDate, show);

        setDate(newDate)
    }

    function clickIncome() {

        if (incomeClicked == 0 && expensesClicked == 1) {
            // let newSelected = incomeClicked == 1 ? 0 : 1;
            setIncomeClicked(1);
            setExpensesClicked(0);
            setType(1);
        }
    }

    function clickExpenses() {

        if (expensesClicked == 0 && incomeClicked == 1) {
            // let newSelected = expensesClicked == 1 ? 0 : 1;
            setExpensesClicked(1);
            setIncomeClicked(0);
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
            }
            // consoleGet(data, show);
            // console.log(data)

            let result = await handleAddTransaction(data);
            // consoleGet("result: " + JSON.stringify(result), show);
            
            if (result && result?.status == "ok" && result?.msg == "New transaction created successfully") {

                Alert.alert('Success', result.msg, [
                    { text: 'Back', onPress: () => {
                        router.back();
                    }},
                    {
                        text: "New", onPress: () => {
                            setDate(new Date(today.setHours(0, 0, 0, 0)));
                            setTitle("");
                            setAmount(0);
                        }
                    }
                ]);

            } else {
                Alert.alert(result.msg ? result.msg : "Error adding new transaction !")
            }

        } else {
            Alert.alert("Title and amount are required !")
        }
    }

    useEffect(() => {
        let date_ = params.date;
        // consoleGet('date_: ' + date_, show);

        if(date_) {
            date_ = date_.length == 10 ? date_ + "000" : date_;
            let dateObj = new Date(parseInt(date_));

            setDate(dateObj);
        }
        
    }, []);

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
                                <TouchableOpacity style={{ marginRight: 5, borderColor: incomeClicked ? "blue" : "black", borderWidth: 2, padding: 5, borderRadius: 5 }}
                                    onPress={() => {
                                        clickIncome();
                                    }}
                                >
                                    <Text>Income</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginRight: 5, borderColor: expensesClicked ? "red" : "black", borderWidth: 2, padding: 5, borderRadius: 5 }}
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
                        <Text style={{ color: "green" }}>Confirm</Text>
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
    }
})