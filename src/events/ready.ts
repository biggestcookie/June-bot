import config from "@/options/config.json";
import { App } from "@/app";

export async function run(app: App) {
  console.log(config.console.ready);
}
