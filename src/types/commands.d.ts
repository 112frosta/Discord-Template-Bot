import type { SlashCommandBuilder, CommandInteraction } from "discord.js";

interface SlashCommand {
  config: SlashCommandBuilder;
  run: (arg: CommandInteraction) => Promise<void>;
}

export { SlashCommand };
