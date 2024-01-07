import type { SlashCommand } from "@/types/commands";

import { client } from "../index";
import { Collection, REST, Routes } from "discord.js";
import { readdirSync } from "node:fs";

let commands = new Collection<string, SlashCommand>();

export default async function initializeCommands() {
  const commandFiles = readdirSync(`${__dirname}/../commands`).filter((file) =>
    file.endsWith(".ts")
  );

  for (const file of commandFiles) {
    const command: SlashCommand = await import(
      `${__dirname}/../commands/${file}`
    );

    if ("config" in command && "run" in command) {
      commands.set(command.config.name, command);
    } else {
      console.log(`[WARN] Missing property "conifg" or "run" in ${file}`);
    }
  }

  await registerSlashCommands();
  handleCommandEvent();
}

async function registerSlashCommands() {
  const values = Array.from(commands.values()).map((command) =>
    command.config.toJSON()
  );

  const rest = new REST().setToken(process.env.BOT_TOKEN!);
  const route = Routes.applicationCommands(process.env.BOT_ID!);

  await rest
    .put(route, { body: values })
    .catch((err) => console.error(err))
    .then(() => console.log(`(/) Registered slash commands: ${commands.size}`));
}

function handleCommandEvent() {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    await command.run(interaction).catch((err) => {
      console.error(err);
      interaction.followUp({
        content: "There was an error while running this command!",
      });
    });
  });
}
