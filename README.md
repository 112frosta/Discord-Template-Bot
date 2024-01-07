# Discord Template Bot

This bot uses a command handler for slash commands. To add a new command, follow these steps:

## Adding a Slash Command

1. Create a new file in the `commands` directory. The file should be named after your command (e.g., `mycommand.ts`).

2. In the new file, you need to export a `SlashCommandBuilder` object and an `run` function. Here's a template:

```typescript
import type { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

const config = new SlashCommandBuilder()
  .setName("pong")
  .setDescription("Replies with ping!");

const run = async (interaction: CommandInteraction) => {
  await interaction.reply("Ping!");
};

export { config, run };
```

## Running the Bot

Before running the bot, you need to set up your environment variables. Create a `.env` file in the root directory of your project and add the following variables:

```bash
BOT_TOKEN=your_bot_token
BOT_ID=your_bot_id
GUILD_ID=your_guild_id
```

Once you've set up your environment variables, you can run the bot in development mode using the following command:

```bash
npm run dev
```
