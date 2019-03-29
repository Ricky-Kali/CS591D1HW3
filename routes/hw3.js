var express = require('express');
var request = require('request');
var router = express.Router();

let func = 'TIME_SERIES_INTRADAY';
let symbol = 'MSFT';
let interval = '30min';
let apikey = '';            // Your API key here
let url = 'https://www.alphavantage.co/query?' +
    'function=${func}&symbol=${symbol}&interval=${interval}&apikey=${apikey}';

router.get('/', function(req, res, next) {
    request.get(url, (err, response, body) => {
        if(err){
            return console.log(err);
        }

        let metadata = JSON.parse(body)["Meta Data"]["1. Information"];
        let timeseries = JSON.parse(body)["Time Series (Daily)"];
        res.render('hw3', {
            title: metadata,
            list: timeseries
        });
    });
});

module.exports = router;