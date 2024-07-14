const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const discordClient = new Client({ intents: [
        GatewayIntentBits.Guilds,
    ]
});

require('console-stamp')(console, 'HH:MM:ss.l');

if (!process.env.DISCORD_API_KEY || process.env.DISCORD_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_API_KEY does not exists or is empty!');
    process.exit(1);
}

if (!process.env.COIN_NAME || process.env.COIN_NAME.length <= 0) {
    console.log('ERROR: Env variable COIN_NAME does not exists or is empty!');
    process.exit(1);
}

if (!process.env.DISPLAY_CURRENCY || process.env.DISPLAY_CURRENCY.length <= 0) {
    console.log('ERROR: Env variable DISPLAY_CURRENCY does not exists or is empty!');
    process.exit(1);
}

const discordApiKey = process.env.DISCORD_API_KEY;
const coinName = process.env.COIN_NAME;
const displayCurrency = process.env.DISPLAY_CURRENCY.toUpperCase();

discordClientRef = discordClient;
discordClientRef.login(discordApiKey)

discordClientRef.on('ready', () => {
    console.log(`Logged in as ${discordClientRef.user.tag}!`);
    discordClientRef.user.setPresence({
        activities: [{ name: '? USD', type: ActivityType.Watching }],
        status: 'online'
    });

    fetch(options.url)
        .then(callback);
});

const options = {
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinName + '&vs_currencies=' + displayCurrency
};

function callback(res) {
    console.log("Got response with http-code: " + res.status + " - " + res.statusText);

    if (res.ok) {
        res.json().then(function onData(jsonObject) {
            const coinObject = jsonObject[Object.keys(jsonObject)[0]];
            var coinValue = coinObject[Object.keys(coinObject)[0]];

            // round the bigger values, no one cares about .xxx there
            if (coinValue > 10) {
                coinValue = Math.round(coinValue);
            } else {
                coinValue = Math.round(coinValue * 1000) / 1000
            }

            console.log("[" + coinName + "]" + " retrieved coin-value is: " + coinValue);
            discordClientRef.user.setPresence({
                activities: [{ name: coinValue + ' ' + displayCurrency, type: ActivityType.Watching }],
                status: 'online'
            });
        });
    } else {
        discordClientRef.user.setPresence({
            activities: [{ name: 'ERR', type: ActivityType.Watching }],
            status: 'online'
        });
    }
}

setInterval(function() {
    console.log("Requesting... " + options.url);
    fetch(options.url)
        .then(callback);
}, 1000*300);

console.log("Logging into discord...");
discordClientRef.login(discordApiKey);
