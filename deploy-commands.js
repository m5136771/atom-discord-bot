const fs = require('node:fs');
const path = require('node:path');
const myToken = process.env['token']
const myGuild = process.env['guildId']
const myClient = process.env['clientId']
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const commands = []
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(myToken);

rest.put(Routes.applicationGuildCommands(myClient, myGuild), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);