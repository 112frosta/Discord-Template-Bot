import type { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

const config = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");

const run = async (interaction: CommandInteraction) => {
  await interaction.reply("Pong!");
};

export { config, run };
