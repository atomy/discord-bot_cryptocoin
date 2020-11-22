const request = require('request');
require('console-stamp')(console, 'HH:MM:ss.l');

coinName = "bitcoin";

const options = {
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinName + '&vs_currencies=usd'
};

function callback(error, response, body) {
    console.log("Got response with http-code: " + response.statusCode);

    if (!error && response.statusCode === 200) {
        console.log("response: " + body);
        const jsonObject = JSON.parse(body);
        const btcObject = jsonObject[Object.keys(jsonObject)[0]];
        var btcValue = btcObject[Object.keys(btcObject)[0]];
        console.log("retrieved btc value is: " + btcValue);
        // client.user.setActivity(btcValue + ' USD', { type: 'WATCHING' } );
    } else {
        // client.user.setActivity('? players playing', { type: 'WATCHING' } );
    }
}

console.log("Requesting... GET " + options.url);
request(options, callback);