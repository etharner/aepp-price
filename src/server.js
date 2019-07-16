const express = require('express');
const fetch = require('node-fetch');

const PORT = 6666;
const HOST = '0.0.0.0';
const API_KEY = '2e7780fe98e0f2f372985d50cfd3c847673d973182e86c5e32db66596d1c770e';
let prices = {};

const getPrices = async () => {
  prices = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=AE&tsyms=USD,JPY,EUR&api_key=${API_KEY}`
  ).then(r => r.json());
};

setInterval(getPrices, 60000);
getPrices();

const app = express();
app.get('/price', (req, res) => {
  res.send(prices);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
