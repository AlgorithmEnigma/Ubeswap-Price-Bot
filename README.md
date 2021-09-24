# Ube Price Bot


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## How to set up a bot
Ubeswap Price bot requires [Node.js](https://nodejs.org/) v16+ to run.

Follow:  
https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot  
https://discordjs.guide/preparations/adding-your-bot-to-servers.html

First create a config.json in the root directory: 
```
{ 
    "clientId0" : "ClientId goes here", 
    "guildId" : "GuildId goes here", 
    "secret0": "Bot secret goes here" 
}
```
Install the dependencies and devDependencies and start the server.

```sh
cd Ubeswap-Price-Bot
yarn install
```

To initialize a bot.

```sh
cd src
node index.js ARG1 ARG2
```
It takes two token arguments
example:
```
node index.js CELO cUSD
```


## License

MIT


