import { StatusBar } from 'expo-status-bar';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ImageBackground,
    Keyboard,
} from 'react-native';
import { getExchangeRate } from './src';
import { useEffect, useState } from 'react';

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

    const image = { uri: 'https://reactjs.org/logo-og.png' };

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
                        keyboardType="numeric"
                        onSubmit={Keyboard.dismiss}
                    />
                </View>
                <View style={styles.conventereD}>
                    <Text style={styles.conventrT}>
                        USD:{(num / data[0]?.rateSell).toFixed(2)}
                    </Text>
                    <Text style={styles.conventrT}>
                        EUR:{(num / data[1]?.rateSell).toFixed(2)}
                    </Text>
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
        backgroundColor: '#2b2b2b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 2,
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        width: 315,
        // backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 50,
        boxShadow: '0px 0px 32px 0px rgba(0,0,0,0.33)',
    },
    conventr: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: 275,
        // backgroundColor: 'yellow',
    },
    conventrH: {
        fontSize: 42,
        padding: 2,
        marginBottom: 25,
        fontFamily: 'sans-serif-thin',
    },
    conventereD: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: 'pink',
        width: 275,
        height: 100,
        padding: 15,
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
        width: 250,
        height: 50,
        padding: 15,
        paddingLeft: 30,
        marginTop: 45,
        background:
            "url('https://w7.pngwing.com/pngs/749/95/png-transparent-currency-converter-exchange-rate-united-states-dollar-foreign-exchange-market-rate-text-trademark-logo.png') no-repeat left",
    },
    exchangeC: {
        flex: 1,
        width: 275,
        // backgroundColor: 'blue',
        alignItems: 'flex-start',
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
