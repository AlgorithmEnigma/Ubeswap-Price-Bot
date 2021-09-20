const fs = require("fs");
const { ChainId, Token, cUSD } = require("@ubeswap/sdk");
const { Client, Intents, Collection, Role} = require("discord.js");
const { secret0, secret1, guildId } = require("../config.json");
const price = require("./data.js");

const client0 = new Client({ intents: [Intents.FLAGS.GUILDS] });
const client1 = new Client({ intents: [Intents.FLAGS.GUILDS] });


const UBE = new Token(
  ChainId.MAINNET,
  "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC", // must be checksummed, decimals
  18,
  "UBE",
  "Ubeswap Goverance Token"
);

const CELO = new Token(
  ChainId.MAINNET,
  "0x471EcE3750Da237f93B8E339c536989b8978a438",
  18,
  "CELO",
  "CELO Token"
);

client0.commands = new Collection();
client1.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(command.data.name);

  client0.commands.set(command.data.name, command);
  client1.commands.set(command.data.name, command);
}

client0.once("ready", (ready) => {
  console.log("Bot Ready!");
  price.getPrice().then((value) => {
    console.log(value);
  });
});

client1.once("ready", (ready) => {
  console.log("Bot Ready!");
  price.getPrice(CELO).then((value) => {
    console.log(value);
  });
});

client0.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client0.commands.get(interaction.commandName);

  if (!command) return;
  price.getPrice().then((value) => {
    interaction.guild.me.setNickname(value);
  });

  setInterval(() => {
    price.getPrice().then((value) => {
      interaction.guild.me.setNickname(value);
      console.log("Change in price.");
    });
  }, 60000);

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      Content: "There was an error executing the command",
      ephemeral: true,
    });
  }
});

client1.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client1.commands.get(interaction.commandName);

  if (!command) return;
  price.getPrice(CELO).then((value) => {
    interaction.guild.me.setNickname(value);
  });

  setInterval(() => {
    price.getPrice(CELO).then((value) => {
      interaction.guild.me.setNickname(value);
      console.log("Change in price.");
    });
  }, 60000);

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      Content: "There was an error executing the command",
      ephemeral: true,
    });
  }
});

client0.login(secret0);
client1.login(secret1);
