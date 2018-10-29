const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/index.html");
});
app.listen(process.env.PORT);

// Ping self every 301 seconds
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 301000);

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./options/config.json");

const fs = require("fs");
client.commandlist = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commandlist.set(command.name, command);
}

require("./loader.js").run(client);

client.login(process.env.DISCORD);
