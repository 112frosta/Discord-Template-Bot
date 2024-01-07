import type { SlashCommand } from "@/types/commands";

import { client } from "../index";
import { Collection, REST, Routes } from "discord.js";
import { readdirSync } from "node:fs";
import path from "node:path";

let commands = new Collection<string, SlashCommand>();
const commandsPath = path.join(__dirname, "../commands");

export default async function initializeCommands() {
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".ts")
  );

  for (const file of commandFiles) {
    const command: SlashCommand = await import(path.join(commandsPath, file));
    commands.set(command.config.name, command);
  }

  await registerSlashCommands();
  await handleCommandEvent();
}

async function registerSlashCommands() {
  const rest = new REST().setToken(process.env.BOT_TOKEN!);

  try {
    console.log("(/) Refreshing commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.BOT_ID!,
        process.env.GUILD_ID!
      ),
      { body: commands.map(({ config }) => config.toJSON()) }
    );

    console.log(`(/) Successfully reloaded commands: ${commands.size}`);
  } catch (err) {
    console.error(`(!) ${err}`);
  }
}

async function handleCommandEvent() {
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
