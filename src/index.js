import axios from 'axios';

export async function getExchangeRate() {
    let array = [];

    const { data } = await axios.get('https://api.monobank.ua/bank/currency');

    array.push(data[0], data[1]);

    return array;
}
