import axios from 'axios';
import express from 'express';
import cron from 'node-cron';
import cors from 'cors';

import data from './mock-data.js';

const app = express();

let DB = data;

app.use(express.json());
app.use(cors());

app.get('/api/rate', (req, res) => {
    res.json(DB);
});

app.listen(6942, (_, __) => {
    console.log(`API started on port: 6942`);
});

cron.schedule('*/5 * * * *', () => {
    console.log('[LOG] Update exchange.');

    axios
        .get('https://api.monobank.ua/bank/currency')
        .then(({ data }) => {
            DB = data;
        })
        .catch((reason) => {
            console.log(reason);
        });
});
