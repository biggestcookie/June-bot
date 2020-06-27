import { App } from "@/app";
import { ArgsMap, Command } from "@/utils/command";

async function addRoleToList(app: App, args: ArgsMap): Promise<string> {
  return "void";
}

const addRole: Command = {
  dm: false,
  admin: true,
  run: addRoleToList,
};

export default addRole;
