// require('dotenv').config(); // Optional: only needed for local development with a .env file
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

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

// Schedule template and joke sending
setInterval(sendTemplate, 1 * 60 * 1000); // Sends template every hour
setInterval(sendJoke, 1 * 60 * 1000); // Sends joke every 30 minutes

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
