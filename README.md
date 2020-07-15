# June-bot

![Banner](https://i.imgur.com/LtyqS5a.jpg)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
[![Support me](https://img.shields.io/badge/Support-Buy%20me%20a%20coffee-yellow.svg?style=flat-square)](https://www.buymeacoffee.com/bigcookie)

The cutest Discord bot you'll ever meet ✿✼:*ﾟ:.｡

## What is this?

June-bot is a Discord bot with [Dialogflow](https://cloud.google.com/dialogflow) integration. Traditionally, Discord commands are invoked with a prefix and pre-configured words (e.g. `~help` as a command).
Dialogflow allows June to instead process commands using natural language. 

![Meme example](https://i.imgur.com/LTJt0TO.png)

This isn't just limited to commands -- simple conversations can be held when the user's input is not interpreted as a command. 

![Dialog example](https://i.imgur.com/DxI6Jt4.png)

June uses Dialogflow's 'small talk' feature, which isn't capable of much more than simple responses to simple questions, but could easily have fallback responses hooked up to Cleverbot or a similar tool to provide richer, context-aware conversations.

## Why make this?

This was a originally a bit of a pet project for myself to learn JavaScript. I did learn a lot and have since upgraded to TypeScript, so now I'm releasing this project for others to use as a reference when integrating Discord and/or Dialogflow in TypeScript. I'm getting fairly busy with other commitments, and will likely stop developing this bot, so I am hoping the project will be a useful reference for anyone aspiring to make a Discord bot using TypeScript or Dialogflow.

I think the Discord community would greatly benefit from more bots using natural language for ease-of-use, role-playing, and so much more.

## How do I use this?

June is not set up for public servers, and this project serves mostly as a reference for anyone to learn from or improve. If you'd like to clone the repository, a simple `npm install` should set you up with the needed dependencies. I'll soon be providing instructions for setting up the Dialogflow end.

## Frequently Asked Questions

### What is June capable of?

Outside of small talk, currently only two commands -- 'send a meme' or 'assign a role'. Dialogflow can be used to trigger any command you can implement in a Discord bot, though, and can be trained to parse user input for arguments. 

![Arg example](https://i.imgur.com/aylkxr0.png)
*Example of an argument (wholesome used as a boolean)*

### Where's the art from?

June's picture comes from [ガオmaker](https://picrew.me/image_maker/229486) on Picrew.


### I have other questions!

Feel free to [open an issue](https://github.com/biggestcookie/June-bot/issues) or reach out to me on Discord at bigcookie#7513 .
