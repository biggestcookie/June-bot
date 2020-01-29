module.exports = {
  name: "template",
  desc: "",
  // If command needs arguments
  args: false,

  // If command is server-only
  guild: false,
  run(message, args) {
    message.channel.send("Command hit.");
  }
};
