const config = require("../options/config.json");

module.exports = {
  run: client => {
    client.user.setActivity(config.msg.status, { type: 3 });
    console.log("Bot running.");
  }
};
