import type { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

const config = new SlashCommandBuilder()
  .setName("pong")
  .setDescription("Replies with ping!");

const run = async (interaction: CommandInteraction) => {
  await interaction.reply("Ping!");
};

export { config, run };
