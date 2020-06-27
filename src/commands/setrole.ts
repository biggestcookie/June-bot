import { App } from "@/app";
import { Command, ArgsMap } from "@/utils/command";

async function setRole(app: App, args: ArgsMap): Promise<string> {
  const role = args.get(0) ?? args.get("rolename");
  return new Promise((resolve) => {
    setTimeout(() => resolve(role), 5000);
  });
}

const role: Command = {
  dm: false,
  admin: false,
  run: setRole,
};

export default role;
