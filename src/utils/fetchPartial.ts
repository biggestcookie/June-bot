import { Channel, Message, MessageReaction } from "discord.js";

export async function fetchPartial<
  T extends Message | MessageReaction | Channel
>(base: T): Promise<T> {
  return base.partial ? (base.fetch() as Promise<T>) : Promise.resolve(base);
}
