const fetch = require('node-fetch');
const Discord = require('discord.js');

const client = new Discord.Client();
require('console-stamp')(console, 'HH:MM:ss.l');

if (!process.env.DISCORD_BITCOIN_API_KEY || process.env.DISCORD_BITCOIN_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_BITCOIN_API_KEY does not exists or is empty!');
    process.exit(1);
}

if (!process.env.DISCORD_ETHEREUM_API_KEY || process.env.DISCORD_ETHEREUM_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_ETHEREUM_API_KEY does not exists or is empty!');
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
    fetch(options.url)
        .then(callback);
});

const options = {
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinName + '&vs_currencies=usd'
};

function callback(res) {
    console.log("Got response with http-code: " + res.status + " - " + res.statusText);

    if (res.ok) {
        const body = res.body;
        res.json().then(function onData(jsonObject) {
            const coinObject = jsonObject[Object.keys(jsonObject)[0]];
            var coinValue = coinObject[Object.keys(coinObject)[0]];

            coinValue = Math.round(coinValue);

            console.log("[" + coinName + "]" + " retrieved coin-value is: " + coinValue);
            client.user.setActivity(coinValue + ' USD', { type: 'WATCHING' } );
        });
    } else {
        client.user.setActivity('? players playing', { type: 'WATCHING' } );
    }
}

setInterval(function() {
    console.log("Requesting... " + options.url);
    fetch(options.url)
        .then(callback);
}, 1000*300);

console.log("Logging in with: " + discordApiKey);
client.login(discordApiKey);
