// fs is Node's native file system module
// path is Node's native path utility module. It helps construct paths to access files and directories
// no need to include '/' just the path names. It automatically detects the operating system and uses the appropriate joiners.
const fs = require('node:fs');
const path = require('node:path');

// discord dependencies
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const myToken = process.env['token'];

// create new client instance to start bot and connect to discord api
// GatewayIntentBits.Guild is a Discord method that gives permissions to the bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// when the client is ready, runs code in ./ready.js one time

// ---EVENTS---
// Node is built to be event-driven. This means that it is good at knowing when things happen and responding to them. Discord.js extends this capability.

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// ---COMMANDS---
// Client#event:interactionCreate listens for new interactions
// when it hears one, first step is to check if: .isChatInputCommand()
// then check .commandName to know which command came through
// then respond with .reply()

// this can be done with an if/else chain, but for big apps with lots of commands, this gets to be very long
// better way is through a command handler

// using .commands property on the client instance allows access to commands in other files

// Collection is a JS Native Map class with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has an ID, for significantly improved performance and ease-of-use.
//Constructor: new Collection(entries);
client.commands = new Collection();

// construct a path and store it in a constant so you can reference it later
// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
//  here, __dirname is '/home/runner/atom-discord-bot'
const commandsPath = path.join(__dirname, 'commands')
//so commandsPath now = '/home/runner/atom-discord-bot/commands'

// pull an array of all .js files in 'commands' folder
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	
	// Set a new item in the Collection
	// With the 'key' @param as a string of command name (from SlashCommandBuilder().setName which has been renamed to 'data' + .name)
	// and the 'value' @param as the exported module (everything in the module from each command.js file )
	client.commands.set(command.data.name, command);
	// so now the Collection is filled with { 'string' => intValue }
}

// when there is an interaction, it will run through this function.
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	// it will grab the command info from the Collection
	const command = client.commands.get(interaction.commandName);

	// exit out if the command doesn't exist ('undefined')
	if (!command) return;

	// then it will pull the code from 'interaction'
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// login to discord with your client's api key
client.login(myToken);

// ./package.json field 'main' defines the path for which file to execute on start
// 'node .' command starts the bot