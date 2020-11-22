const request = require('request');
const Discord = require('discord.js');

const client = new Discord.Client();
require('console-stamp')(console, 'HH:MM:ss.l');

if (!process.env.DISCORD_API_KEY || process.env.DISCORD_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_API_KEY does not exists or is empty!');
    process.exit(1);
}

if (!process.env.COIN_NAME || process.env.COIN_NAME.length <= 0) {
    console.log('ERROR: Env variable COIN_NAME does not exists or is empty!');
    process.exit(1);
}

const discordApiKey = process.env.DISCORD_API_KEY;
const coinName = process.env.COIN_NAME;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('? USD', { type: 'WATCHING' } );
    request(options, callback);
});

const options = {
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinName + '&vs_currencies=usd'
};

function callback(error, response, body) {
    console.log("Got response with http-code: " + response.statusCode);

    if (!error && response.statusCode === 200) {
        console.log("response: " + body);
        const jsonObject = JSON.parse(body);
        const coinObject = jsonObject[Object.keys(jsonObject)[0]];
        var coinValue = coinObject[Object.keys(coinObject)[0]];
        console.log("retrieved btc value is: " + coinValue);
        client.user.setActivity(btcValue + ' USD', { type: 'WATCHING' } );
    } else {
        client.user.setActivity('? players playing', { type: 'WATCHING' } );
    }
}

setInterval(function() {
    console.log("Requesting...");
    request(options, callback);
}, 1000*300);

client.login(discordApiKey);
