import { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, SectionList } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { selectAllTransaction } from '../_Controllers/transactionController';
import { consoleGet } from '../utils/general';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

export default function Transaction() {
    let router = useRouter();

    const [transactionList, setTransactionList] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExp, setTotalExp] = useState(0);
    const [total, setTotal] = useState(0);

    const show = false;

    async function handleGetTransactions() {

        let totalInc = 0;
        let totalExp = 0;

        let results = await selectAllTransaction();
        consoleGet("results: " + JSON.stringify(results), show);

        if (results && results?.status == "ok" && results?.msg == "Successfully get all transaction") {
            let data = results.data;

            const organizedList = data.reduce((acc, item) => {

                if(item.type == 1) {
                    totalInc += item.amount;
                } else {
                    totalExp += item.amount;
                }
                
                let group = acc.find(g => 
                    g.date === item.Date
                );

                if (group) {
                    group.data.push(item);
                } else {
                    acc.push({ date: item.Date, data: [item] });
                }

                return acc;
            }, []);
            // console.log(JSON.stringify(organizedList))

            organizedList.sort((a, b) => b.date - a.date);

            let total = totalInc - totalExp;

            setTransactionList(organizedList);
            setTotalIncome(Number(totalInc.toFixed(2)));
            setTotalExp(Number(totalExp.toFixed(2)));
            setTotal(Number(total.toFixed(2)));
        }
    }

    // useEffect(() => {
    //     console.log("refreshing the page")
    //     handleGetTransactions();
    // }, []);

    useFocusEffect(
        useCallback(() => {
          handleGetTransactions();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.summary}>
                <View style={styles.subView}>
                    <Text>Income</Text>
                    <Text style={{ color: "#1F316F" }}>{totalIncome}</Text>
                </View>
                <View style={styles.subView}>
                    <Text>Expenses</Text>
                    <Text style={{ color: "#C7253E" }}>{totalExp}</Text>
                </View>
                <View style={styles.subView}>
                    <Text>Remaining</Text>
                    <Text>{total}</Text>
                </View>
            </View>

            <TouchableOpacity style={{ backgroundColor: "#C4DAD2", alignItems: "center" }} onPress={() => {
                router.push("/(tabs)/addTransaction")
            }}>
                <Text>Add</Text>
            </TouchableOpacity>

            <SectionList
                sections={transactionList}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index, section }) => (
                    <TouchableOpacity style={[styles.item, 
                        index === section.data.length - 1 ? { marginBottom: 20 } : null,
                    ]}
                    onPress={() => {
                        router.push({pathname: "/(tabs)/editTransaction", params: {id: item._id, title: item.title, type: item.type, amount: item.amount, date: item.Date}})
                    }}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>Types: {item.type === 1 ? 'Income' : 'Expense'}</Text>
                        <Text style={item.type === 0 ? { color: "red" } : {color: "blue"}}>RM {item.amount}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { date } }) => (
                    <TouchableOpacity style={styles.header} 
                        onPress={() => { router.push({pathname: "/(tabs)/addTransaction", params: {date: date}}) }}
                    >
                        <View style={{justifyContent: "center"}}>
                            <Text style={styles.headerText}>{moment.unix(parseInt(date)).format("DD-MM-YYYY")}</Text>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: 10}}>
                            <Text style={{color: "black", backgroundColor: "#E9EFEC", fontSize: 15, borderColor: "black", borderWidth: 2, borderRadius: 5, overflow: 'hidden'}}>{moment.unix(parseInt(date)).format("ddd")}</Text>                        
                        </View>
                    </TouchableOpacity>
                )}
                style={{marginTop: 5}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16423C"
    },
    summary: {
        flexDirection: "row",
        backgroundColor: "#6A9C89"
    },
    subView: {
        flex: 1,
        borderColor: "black",
        borderWidth: 2,
        alignItems: "center"
    },
    header: {
        backgroundColor: "#6A9C89",
        flex: 1,
        flexDirection: "row",
        height: 35,
    },
    headerText: {
        color: "black",
        fontSize: 20,
        marginLeft: 5,
    },
    item: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#E9EFEC",
        justifyContent: "space-between",
        borderTopWidth: 1,
        padding: 10,
    }
})