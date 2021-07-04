const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const { prefix } = require('./config.json');

dotenv.config();

// Create new discorc client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //parse arguements for commands
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //get command name on its own
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// Login to discord app using token
client.login(process.env.TOKEN);
