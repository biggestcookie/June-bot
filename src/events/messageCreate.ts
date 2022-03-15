import { Message, User } from "discord.js";
import { client } from "../app";

export async function onMessageCreate(message: Message) {
  const isMentionsJune =
    message.mentions.users.size === 1 &&
    message.mentions.has(client.user as User);

  if (!isMentionsJune && message.channel.type !== "DM") {
    return;
  }
}
