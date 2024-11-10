
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
// const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(process.env.BOT_TOKEN, { webHook: true });
bot.setWebHook(`${process.env.APP_URL}/bot${process.env.BOT_TOKEN}`);

// Theme messages for each day of the week
// const weeklyThemes = {
//     monday: "Happy Meme Mania Monday, Robie fam! 🤖😂 It’s time to kick off the week with some laughs—share your funniest Robie-themed memes in TG and X and let’s get creative! Use the hashtags to spread the word! #MemeMania #Robie",
//     tuesday: "It's Taskmaster Tuesday, Robie fam! 💪🚀 We’ve got a task for you today—let’s come together and get it done! Check today’s pinned message for your mission.",
//     wednesday: "Happy Wisdom Wednesday, Robie fam! 📚✨ Let’s share our best crypto tips, tricks, and wisdom today. Got something smart to share? Let’s learn and grow together! Keep an eye out for Moth’s pinned words of wisdom #WisdomWednesday #RobiesCryptoAcademy",
//     thursday: "It's Taskmaster Thursday, Robie fam! 🔙🎉 Let’s take the day to get our work done. We’ve got another task for you today—let’s come together and get it done! Check today’s pinned message for your mission.",
//     friday: "Welcome to Feature Friday, Robie fam! 🌟 Today, we’re shining the spotlight on an amazing community member. Stay tuned for today’s feature—and let’s celebrate those who make RobieCoin special! #FeatureFriday #Robie",
//     saturday: "Happy Share-It Saturday, Robie fam! 🫂💎 Let’s get personal today—share a story, a win, or even how you joined the Robie community. Let’s connect and grow together! #ShareItSaturday #Robie",
//     sunday: "It’s Strategy Sunday, Robie fam! 📈🚀 Let’s discuss our goals and plans for the week ahead. What’s next for RobieCoin? Let’s prepare for success and make it happen together! Stay tuned for an update from the team. #StrategySunday"
// };

// // Function to send theme message for the specified day
// function sendThemeMessage(day) {
//     const message = weeklyThemes[day.toLowerCase()];
//     if (message) {
//         bot.sendMessage(process.env.CHAT_ID, message)
//             .then(() => console.log(`Sent ${day} message successfully`))
//             .catch(error => console.error(`Error sending ${day} message:`, error));
//     }
// }

// // Schedule theme messages every 2 hours on each specific day
// cron.schedule('0 */6 * * 1', () => sendThemeMessage('monday'));     // Every 2 hours on Monday
// cron.schedule('0 */6 * * 2', () => sendThemeMessage('tuesday'));    // Every 2 hours on Tuesday
// cron.schedule('0 */6 * * 3', () => sendThemeMessage('wednesday'));  // Every 2 hours on Wednesday
// cron.schedule('0 */6 * * 4', () => sendThemeMessage('thursday'));   // Every 2 hours on Thursday
// cron.schedule('0 */6 * * 5', () => sendThemeMessage('friday'));     // Every 2 hours on Friday
// cron.schedule('0 */6 * * 6', () => sendThemeMessage('saturday'));   // Every 2 hours on Saturday
// cron.schedule('0 */6 * * 0', () => sendThemeMessage('sunday'));     // Every 2 hours on Sunday


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
cron.schedule('0 */4 * * *', sendTemplate); // Sends template every hour
cron.schedule('*/60 * * * *', sendJoke); // Sends joke every 45 minutes

// Schedule daily community task every 2 hours
cron.schedule('0 */8 * * *', sendDailyCommunityTask); // Sends daily community task every 2 hours

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
