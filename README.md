# June-bot

![Banner](https://i.imgur.com/LtyqS5a.jpg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Support me](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/bigcookie)

The cutest Discord bot you'll ever meet ✿✼:\*ﾟ:.｡

## What is this?

June-bot is a Discord bot with [Dialogflow](https://cloud.google.com/dialogflow) integration. Traditionally, Discord commands are invoked with a prefix and pre-configured words (e.g. `~help` as a command).
Dialogflow allows June to instead process commands using natural language.

![Meme example](https://i.imgur.com/LTJt0TO.png)

This isn't just limited to commands -- simple conversations can be held when the user's input is not interpreted as a command.

![Dialog example](https://i.imgur.com/DxI6Jt4.png)

June uses Dialogflow's 'small talk' feature, which isn't capable of much more than simple responses to simple questions. However, one could easily have fallback responses instead hooked up to Cleverbot or a similar tool to provide richer, context-aware conversations.

## Why make this?

This was a originally a bit of a pet project for myself to learn JavaScript. I did learn a lot and have since upgraded to TypeScript, so now I'm releasing this project for others to use as an example when integrating Discord and/or Dialogflow in TypeScript. I will likely have to stop developing this bot soon, so I am hoping the project will be helpful for anyone aspiring to make a Discord bot with these tools.

I think the Discord community would greatly benefit from more bots using natural language for ease-of-use, role-playing, and so much more.

## How do I use this?

June is not set up for public servers. If you'd like to clone the repository to try it for yourself, a simple `npm install` should set you up with the needed dependencies. I'll soon be providing instructions for setting up the Dialogflow end.

## Frequently Asked Questions

### What is June capable of?

Outside of small talk, currently only a few commands (this is not unlike most programmers). Dialogflow can be used to trigger any command you can implement in a Discord bot, though, and can be trained to parse user input for arguments. June's current command list will soon be provided [in the wiki](https://github.com/biggestcookie/June-bot/wiki).

### Where's the art from?

June's picture comes from [ガオ maker](https://picrew.me/image_maker/229486) on Picrew.

### I have other questions!

Feel free to [open an issue](https://github.com/biggestcookie/June-bot/issues) or reach out to me on Discord at bigcookie#7513 .
