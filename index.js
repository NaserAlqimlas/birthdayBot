const Discord = require('discord.js');
const dotenv = require('dotenv');
const { prefix } = require('./config.json');

dotenv.config();

// Create new discorc client
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //parse arguements for commands
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //get command name on its own
  const command = args.shift().toLowerCase();

  if (command === 'add') {
    if (!args.length) {
      return message.channel.send(
        `Please provide user/birthday info, ${message.author}!`
      );
    } else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }
  }
});

// Login to discord app using token
client.login(process.env.TOKEN);
