import { ArgsMap } from "@/utils/command";

export async function execute(args: ArgsMap): Promise<string> {
  const role = args.get(0) ?? args.get("rolename");
  return new Promise((resolve) => {
    setTimeout(() => resolve(role), 5000);
  });
}
