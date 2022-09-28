import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { getExchangeRate } from './src';
import { useEffect, useState } from 'react';

export default function App() {
    const [data, setData] = useState([]);
    const [num, setNum] = useState(null);

    useEffect(() => {
        getExchangeRate().then((response) => {
            setData(response);
        });
    }, []);

    if (!data) return <Text>Loading...</Text>;

    function handleChange(e) {
        setNum(e.target.value);
    }

    function conventorD() {
        const dollars = num / data[0].rateSell;
        return dollars;
    }

    function conventorE() {
        const euro = num / data[1].rateSell;
        return euro;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.conventr}>
                    <Text style={styles.conventrH}>Convert</Text>
                    <TextInput
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="Enter number"
                        keyboardType="numeric"
                        maxLength={10}
                    />
                    <View style={styles.conventereD}>
                        <Text style={styles.conventrT}>USD:{conventorD}</Text>
                        <Text style={styles.conventrT}>EUR:{conventorE}</Text>
                    </View>
                </View>
                <View style={styles.exchangeC}>
                    {data.map(({ currencyCodeA, rateSell, rateBuy }, index) => (
                        <View key={index}>
                            <Text style={styles.exchangeCt}>
                                {currencyCodeA === 840 ? 'USD' : 'EURO'} | Sell:
                                {rateBuy} | Buy: {rateSell}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F3F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        width: 275,
        // backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    conventr: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
    },
    conventrH: {
        fontSize: 25,
        padding: 2,
        margin: 12,
        fontFamily: 'sans-serif-thin',
    },
    conventereD: {
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: 'pink',
        width: 250,
        height: 100,
        marginTop: 52,
        paddingLeft: 15,
    },
    conventrT: {
        fontSize: 18,
        marginTop: 20,
        fontFamily: 'sans-serif-thin',
    },
    input: {
        borderWidth: 0.1,
        borderRadius: 2,
        borderBottomWidth: 1,
        width: 200,
        height: 50,
        padding: 15,
        paddingLeft: 30,
        background:
            "url('https://www.pngwing.com/en/free-png-ztvmr') no-repeat left",
    },
    exchangeC: {
        flex: 1,
        width: 250,
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 550,
        marginBottom: 50,
    },
    exchangeCt: {
        fontSize: 18,
        padding: 2,
        marginBottom: 3,
        fontFamily: 'sans-serif-thin',
        // backgroundColor: 'green',
    },
});
