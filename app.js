const express = require("express");
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
const config = require("./options/config.json");

const app = express();

require("dotenv").config();

client.commandList = new Map();
fs.readdirSync("./commands").forEach(file => {
  const command = require(`./commands/${file}`);
  client.commandList.set(command.name, command);
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

require("./loader.js").run(client);

client.login(process.env.DISCORD);
