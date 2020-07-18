import config from "@/config.json";

export async function execute() {
  console.log(config.console.ready);
}
