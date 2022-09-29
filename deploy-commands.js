// This file is used to register AND UPDATE the slash commands for your bot application.
// run 'node deploy-commands.js' in shell to register new commands.

// explained in index.js
const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');

//new required dep 'npm install @discordjs/rest'
const { REST } = require('@discordjs/rest');

//import secrets
const clientId = process.env['clientId']
const { clientId, guildId, token } = require('./config.json');

const commands = [// array for building commands: new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	]
// if commands built that way, followed by: .map(command => command.toJSON());


// same as in index.js
// pull an array of all .js files in 'commands' folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


// same as in index.js
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// so commands can be added to the bot info on discord's server, here we push command information to JSON format
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

// PUT request to bot's global command file
// returns success message when successful
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

// ---TO DELETE COMMANDS---
// Go to bot settings in server and copy id of the command
// uncomment this code and run 'node deploy-commands.js'

// for guild-based commands
/* rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error); */

// for global commands
/* rest.delete(Routes.applicationCommand(clientId, 'commandId'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error); */