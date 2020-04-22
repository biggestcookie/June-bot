import { App } from "@/app";
import { Message, User } from "discord.js";
import config from "@/options/config.json";

export async function run(app: App, message: Message) {
  const isChatCommand = message.cleanContent.startsWith(config.prefix);
  const isMessageForBot =
    message.mentions.has(app.client.user as User) ||
    message.channel.type === "dm";

  if (isChatCommand) {
    // parse command
  } else if (isMessageForBot) {
    // dialogflow
    message.channel.startTyping();
  }
}
