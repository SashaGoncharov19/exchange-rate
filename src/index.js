import axios from 'axios';

export async function getExchangeRate() {
    let array = [];

    try {
        const { data } = await axios.get('http://192.168.0.218:6942/api/rate');

        array.push(data[0], data[1]);
    } catch (e) {
        console.log(e);
    }

    return array;
}
