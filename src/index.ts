import { Client } from "discord.js";

import initializeCommands from "./handlers/commandHandler";

require("dotenv").config();

const client = new Client({ intents: ["MessageContent"] });

client.once("ready", async () => {
  await initializeCommands();
  console.log(`(+) Logged in as ${client.user?.tag}!`);
});

client.login(process.env.BOT_TOKEN);

export { client };
