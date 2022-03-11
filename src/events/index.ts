import { ClientEvents } from "discord.js";
import { onInteractionCreate } from "./interactionCreate";
import { onMessageReactionAdd } from "./messageReactionAdd";
import { onMessageReactionRemove } from "./messageReactionRemove";

export const events: Partial<
  Record<keyof ClientEvents, (...args: any) => Promise<void>>
> = {
  interactionCreate: onInteractionCreate,
  messageReactionAdd: onMessageReactionAdd,
  messageReactionRemove: onMessageReactionRemove,
};
