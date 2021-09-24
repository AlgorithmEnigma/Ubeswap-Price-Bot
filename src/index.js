const fs = require("fs");
const { ChainId, Token, cUSD } = require("@ubeswap/sdk");
const { Client, Intents, Collection, Role, Guild } = require("discord.js");
const { secret0, guildId } = require("../config.json");
const { getTokenInfo, getPrice } = require("./data.js");

const args = process.argv.slice(2);

// Create discord client
const client0 = new Client({ intents: [Intents.FLAGS.GUILDS] });
// console.log(client0.guilds.resolveId(guildId));

// Init token constants
const argToken0 = getTokenInfo(args[0]);
const argToken1 = getTokenInfo(args[1]);
const UBE = getTokenInfo("UBE");
const CELO = getTokenInfo("CELO");

// Create client commands
client0.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(command.data.name);

  client0.commands.set(command.data.name, command);
}

//On bot initialization set bots nickname and status.
//Creates a interval that refreshes the price.
client0.once("ready", async (ready) => {
  if (argToken0 != undefined && argToken1 != undefined) {
    console.log(
      `Bot Ready, with provided token pair: ${argToken0.symbol}<>${argToken1.symbol}`
    );
  } else {
    console.log(
      `Bot Ready with no provided token pair, using default: UBE<>cUSD!`
    );
  }
  const presenceData = {
    status: "online",
    activities: [
      {
        name: "Market Cap: TODO | Circulating Supply: TODO | TVL: TODO",
        type: "WATCHING",
      },
    ],
  };
  client0.user.setPresence(presenceData);

  // setInterval(() => {
  ready.guilds.fetch(guildId).then((guild) => {
    if (argToken0 != undefined && argToken1 != undefined) {
      getPrice(argToken0, argToken1).then((value) => {
        guild.me.setNickname(value);
        console.log(`Change in ${value}`);
      });
    } else {
      getPrice().then((value) => {
        guild.me.setNickname(value);
        console.log(`Change in ${value}`);
      });
    }
  });
  // }, 60000);
});

//Watches for commands
client0.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client0.commands.get(interaction.commandName);

  if (!command) return;
  // getPrice().then((value) => {
  //   interaction.guild.me.setNickname(value);
  // });

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
