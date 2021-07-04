module.exports = {
  name: 'add',
  description: 'add a new birhday',
  execute(message, args) {
    if (!args.length) {
      return message.channel.send(
        `Please provide user/birthday info, ${message.author}!`
      );
    }
  },
};
