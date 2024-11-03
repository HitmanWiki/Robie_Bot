const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const bot = new TelegramBot('process.env.BOT_TOKEN', { polling: true });

const chatId = 'process.env.GROUP_CHAT_ID'; // Replace with your group chat ID

// Template including text and image path
const template = {
    text: `⚔⚔⚔ Raiding Template  

Boost our visibility with these simple steps:  

1. Like this post ✨  
2. Comment with your original $Robie (make sure it's unique and use relevant hashtags) ✨  
3. Repost this to your followers ✨  
4. Engage with others by liking and commenting on their posts (this helps us climb the algorithm for more views) ✨  

Your support is essential! Let's make this viral together!`,
    image: 'Images/9.jpg' // replace with actual path or URL
};

// Function to send the template
function sendTemplate() {
    bot.sendPhoto(chatId, template.image, { caption: template.text });
}

// Function to fetch and send a random joke from the API
async function sendJoke() {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = `${response.data.setup} - ${response.data.punchline}`;
        bot.sendMessage(chatId, joke);
    } catch (error) {
        console.error("Error fetching joke:", error);
        bot.sendMessage(chatId, "Couldn't fetch a joke at the moment, please try later!");
    }
}

// Set interval to send the template every hour
setInterval(() => {
    sendTemplate();
}, 1 * 60 * 1000); // Sends every hour

// Set interval to send a joke every 30 minutes
setInterval(() => {
    sendJoke();
}, 1 * 60 * 1000); // Sends every 30 minutes
