import { StatusBar } from 'expo-status-bar';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { getExchangeRate } from './src';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export default function App() {
    const [data, setData] = useState([]);
    const [num, setNum] = useState('');

    useEffect(() => {
        getExchangeRate().then((response) => {
            setData(response);
        });
    }, []);

    if (!data) return <Text>Loading...</Text>;

    function handleChange(text) {
        setNum(text);
    }

    return (
        <SafeAreaView style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.wrapper}>
                <View style={styles.conventr} onPress={Keyboard.dismiss}>
                    <Text style={styles.conventrH}>Convert</Text>
                    <TextInput
                        onChangeText={handleChange}
                        style={styles.input}
                        placeholder="Enter number"
                        maxLength={10}
                        onSubmit={Keyboard.dismiss}
                    />
                    <View style={styles.conventereD}>
                        <Text style={styles.conventrT}>
                            USD:{num / data[0]?.rateSell}
                        </Text>
                        <Text style={styles.conventrT}>
                            EUR:{num / data[1]?.rateSell}
                        </Text>
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
            "url('https://w7.pngwing.com/pngs/749/95/png-transparent-currency-converter-exchange-rate-united-states-dollar-foreign-exchange-market-rate-text-trademark-logo.png') no-repeat left",
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
