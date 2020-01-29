module.exports = {
  name: "help",
  desc: "Type `/help {commandname}` to show a command's description.",
  args: false,
  guild: false,
  run(message, args) {
    if (args.length) {
      const command = client.commandList.get(args[0]);
      message.channel.send(command.desc);
    } else {
      const commandListString = "";
      message.channel.send(desc);
      message.channel.send();
    }
  }
};
