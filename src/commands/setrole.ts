import { ArgsMap, Command } from "@/utils/command";

async function execute(args: ArgsMap): Promise<string> {
  const role = args.get(0) ?? args.get("rolename");
  return new Promise((resolve) => {
    setTimeout(() => resolve(role), 5000);
  });
}

const role: Command = {
  dm: false,
  admin: false,
  execute,
};

export default role;
