import { App } from "@/app";
import { Command, ArgsMap } from "@/utils/command";

async function setRole(app: App, args: ArgsMap): Promise<string> {
  const role = args.get(0) ?? args.get("rolename");
  return role;
}

const role: Command = {
  dm: false,
  run: setRole
};

export default role;
