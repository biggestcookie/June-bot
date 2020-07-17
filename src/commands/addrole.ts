import { ArgsMap, Command } from "@/utils/command";
import { Message } from "discord.js";

async function addRoleToList(args: ArgsMap, message: Message): Promise<string> {
  const roleName = args.get(0) ?? args.get("rolename");

  return "void";
}

const addRole: Command = {
  dm: false,
  admin: true,
  run: addRoleToList,
};

export default addRole;
