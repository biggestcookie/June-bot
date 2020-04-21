import config from "@/options/config.json";

export interface HelpText {
  aliases: string[];
  desc: string;
  dm?: true;
  usage: string;
}

export abstract class Command {
  name: string;
  helpText: HelpText;

  constructor(name: string) {
    this.name = name;
    this.helpText = {
      aliases: (config.commands as any)[name]["aliases"],
      desc: (config.commands as any)[name]["desc"],
      usage: (config.commands as any)[name]["usage"]
    };
  }
}
