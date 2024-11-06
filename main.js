
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(process.env.BOT_TOKEN, { webHook: true });
bot.setWebHook(`${process.env.APP_URL}/bot${process.env.BOT_TOKEN}`);

// Template including text and image path
const template = {
    text: `⚔⚔⚔ Raiding Template  

Boost our visibility with these simple steps:  

1. Like this post ✨  
2. Comment with your original $Robie (make sure it's unique and use relevant hashtags) ✨  
3. Repost this to your followers ✨  
4. Engage with others by liking and commenting on their posts (this helps us climb the algorithm for more views) ✨  

Your support is essential! Let's make this viral together!`,
    image: 'Images/9.jpg' // Replace with an actual URL
};

// Function to send the template
function sendTemplate() {
    bot.sendPhoto(process.env.CHAT_ID, template.image, { caption: template.text })
        .catch(error => console.error("Error sending photo:", error));
}

// Function to fetch and send a random joke from the API
async function sendJoke() {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = `${response.data.setup} - ${response.data.punchline}`;
        bot.sendMessage(process.env.CHAT_ID, joke);
    } catch (error) {
        console.error("Error fetching joke:", error);
        bot.sendMessage(process.env.CHAT_ID, "Couldn't fetch a joke at the moment, please try later!");
    }
}

// Function to send daily community tasks message
function sendDailyCommunityTask() {
    const dailyTasksText = `
*DAILY COMMUNITY TASKS!*  

Please vote up or hit the Rocket on all platforms:  

The importance of completing daily tasks is to maximize the growth and success of the project.  
Let's work together to achieve our goals and make a positive impact on the project's future!  

Write and post a bullish comment about $Robie.

⚡ [Dextools](https://www.dextools.io/app/en/ether/pair-explorer/0xbf36abdf1ac7536adc354fb5a0dedb4c155520d3?t=1730446639793)  
⚡ [Dexscreener](https://dexscreener.com/ethereum/0xbf36abdf1ac7536adc354fb5a0dedb4c155520d3)  
⚡ [Launchbar](https://launchbar.pro/token/$Robie)  
⚡ [Coinscope](https://www.coinscope.co/coin/robie)  
⚡ [Coinhunt](https://coinhunt.cc/coin/6725e95605f71f1653b80376)  
⚡ [Coinbrain](https://coinbrain.com/coins/eth-0x2025bf4e0c1117685b1bf2ea2be56c7deb11bc99)  
⚡ [Birdeye](https://birdeye.so/token/0x2025bf4e0c1117685b1bf2ea2be56c7deb11bc99?chain=ethereum)  
⚡ [CoinDizzy](https://coindizzy.com/coin/0x2025BF4E0C1117685b1BF2ea2be56C7Deb11bc99)  
⚡ [Coindetector](https://www.coindetector.cc/address/0x2025bf4e0c1117685b1bf2ea2be56c7deb11bc99)  
⚡ [FomoSpiders](https://fomospider.com/coin/Robie)  
⚡ [Coinmoonhunt](https://coinmoonhunt.com/coin/Robie)  
⚡ [Gemsradar](https://gemsradar.com/coins/robie)  
⚡ [Top100Token](https://top100token.com/address/0x2025BF4E0C1117685b1BF2ea2be56C7Deb11bc99)  
⚡ [Coinsnipper](https://coinsniper.net/coin/73156)  
⚡ [Coindetector](https://www.coindetector.cc/address/0x2025bf4e0c1117685b1bf2ea2be56c7deb11bc99)  
⚡ [Coinlists](https://coinlists.net/coin/2938)  
⚡ [Twitter](https://x.com/RobieCoin)  

---

*Glitch for infinite rockets on dexscreener:* [Dexscreener](https://dexscreener.com/ethereum/0xbf36abdf1ac7536adc354fb5a0dedb4c155520d3)  

Get off WiFi and use your mobile data:

1. Go to dexscreener and hit the emoji (🚀 or 🔥)  
2. Turn airplane mode on and then turn it off.  
3. Refresh the dexscreener page and then hit the emoji again.  

You can do it as many times as you want. Let's do it together and get 1000 🚀 and 1000 🔥!  

⚡🚀 [Dexscreener](https://dexscreener.com/ethereum/0xbf36abdf1ac7536adc354fb5a0dedb4c155520d3) 🚀
`;

    bot.sendMessage(process.env.CHAT_ID, dailyTasksText, { parse_mode: 'Markdown' })
        .catch(error => console.error("Error sending daily tasks message:", error));
}

// Schedule template and joke sending using node-cron
cron.schedule('0 */1 * * *', sendTemplate); // Sends template every hour
cron.schedule('*/45 * * * *', sendJoke); // Sends joke every 45 minutes

// Schedule daily community task every 2 hours
cron.schedule('0 */2 * * *', sendDailyCommunityTask); // Sends daily community task every 2 hours

// Express route for handling webhook requests
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
