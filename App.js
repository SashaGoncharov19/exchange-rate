import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getExchangeRate } from './src';
import { useEffect, useState } from 'react';

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getExchangeRate().then((response) => {
            setData(response);
        });
    }, []);

    if (!data) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            {data.map(({ currencyCodeA, rateSell, rateBuy }, index) => (
                <View key={index}>
                    <Text>
                        {currencyCodeA === 840 ? 'USD' : 'EURO'} | Sell:{' '}
                        {rateBuy} | Buy: {rateSell}
                    </Text>
                </View>
            ))}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
