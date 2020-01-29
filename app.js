const express = require("express");
const fs = require("fs");
const Discord = require("discord.js");
const http = require("http");
const { execSync } = require("child_process");

const client = new Discord.Client();
const config = require("./options/config.json");

const app = express();

// require('dotenv').config();

// Pulls latest changes from GitHub remote
function gitPull() {
  console.log("Fetching latest changes.");
  const output = execSync("git pull").toString();
  console.log(output);
}
gitPull();
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  gitPull();
}, 301000);

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
