import { ArgsMap, Command } from "@/utils/command";

async function setRole(args: ArgsMap): Promise<string> {
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
