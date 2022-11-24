const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents:
	[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildPresences,
	],
});

// EVENTS HANDLER
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

// PRESENCE UPDATER (LOG ON / LOG OFF)
client.on('presenceUpdate', (oldPresence, newPresence) => {
	let userTag = newPresence.user.tag

	try {
		if (oldPresence.status === 'undefined' || oldPresence.status === null && newPresence.status === 'online') {
			messageText = `🟢 ${userTag} logged on!`
		} else if (newPresence.status === 'offline') {
			messageText = `🔴 ${userTag} logged off!`;
		} else if (oldPresence.status === 'offline' && newPresence.status === 'online') {
			messageText = `🟢 ${userTag} logged on! (from invisible?)`;
		} else if (oldPresence.status === newPresence.status) {
			return;
		} else {
			messageText = `${userTag} changed status from ${oldPresence.status} to ${newPresence.status}`
		};
		
		client.channels.cache.get('1036805916223340646')
		.send(`${messageText}`);

	} catch (e) {
		console.log(e);
	};
});


// SET UP COMMANDS COLLECTION
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
}

// SET UP BUTTON-COMMANDS COLLECTION
client.buttonCommands = new Collection();
const buttonCommandsPath = path.join(__dirname, 'button-commands');
const buttonCommandFiles = fs.readdirSync(buttonCommandsPath).filter(file => file.endsWith('.js'));

for (const file of buttonCommandFiles) {
	const filePath = path.join(buttonCommandsPath, file);
	const buttonCommand = require(filePath);

	client.buttonCommands.set(buttonCommand.customId, buttonCommand);
}

// SET UP MENU-COMMANDS COLLECTION
client.menuCommands = new Collection();
const menuCommandsPath = path.join(__dirname, 'menu-commands');
const menuCommandFiles = fs.readdirSync(menuCommandsPath).filter(file => file.endsWith('.js'));

for (const file of menuCommandFiles) {
	const filePath = path.join(menuCommandsPath, file);
	const menuCommand = require(filePath);

	client.menuCommands.set(menuCommand.customId, menuCommand);
}

client.login(token);