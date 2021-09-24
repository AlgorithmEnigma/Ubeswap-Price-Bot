const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId0, clientId1 ,guildId, secret0, secret1 } = require("../config.json");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  console.log(`Command ${file} set.`);
}


const rest0 = new REST({ version: "9" }).setToken(secret0);

(async () => {
  try {
    await rest0.put(
      Routes.applicationGuildCommands(clientId0, guildId),
      {body: commands},
    );

    console.log('Successfully registered application commands.');

  } catch (err) {
    console.error(err);
  }
})();
