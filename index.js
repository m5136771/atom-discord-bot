const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { mongoUri, token } = require('./config.json');
const mongoose = require('mongoose');

// Client Init
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences] });

// console.log(myGuild.approximateMemberCount);

/* const baseManager = new BaseManager();
console.log(baseManager); */

/* const dataManager = new DataManager();
console.log(dataManager.cache); */

/* console.log(client.guild);
const gChannelManager = new GuildChannelManager();
console.log(gChannelManager.channelCountWithoutThreads); */

/* console.log(gChannelManager.client);
console.log(gChannelManager.guild);
console.log(gChannelManager.cache); */

// Event Handler
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

// Command Handler
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	console.log(`Adding command ${file}...`);
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
}
// console.log(client.commands);

// Button Command Handler
client.buttonCommands = new Collection();
const buttonCommandsPath = path.join(__dirname, 'button-commands');
const buttonCommandFiles = fs.readdirSync(buttonCommandsPath).filter(file => file.endsWith('.js'));

for (const file of buttonCommandFiles) {
	const filePath = path.join(buttonCommandsPath, file);
	const buttonCommand = require(filePath);

	client.buttonCommands.set(buttonCommand.customId, buttonCommand);
}

// Select Menu Command Handler
client.menuCommands = new Collection();
const menuCommandsPath = path.join(__dirname, 'menu-commands');
const menuCommandFiles = fs.readdirSync(menuCommandsPath).filter(file => file.endsWith('.js'));

for (const file of menuCommandFiles) {
	const filePath = path.join(menuCommandsPath, file);
	const menuCommand = require(filePath);

	client.menuCommands.set(menuCommand.customId, menuCommand);
}

// Mongo Connect & Events
mongoose
	.set('strictQuery', false)
	.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(
		() => { console.log('\nConnected to DB.\n'); },
		err => { console.log(err); },
	);

mongoose
	.connection.on('connecting', err => {
		console.log(err);
	  });

mongoose
	.connection.on('error', err => {
		console.log(err);
	  });

mongoose
	  .connection.on('disconnected', err => {
		console.log(err);
	  });


// Presence Handler **ADD THIS EVENT TO EVENTS FOLDER**

/* client.on('presenceUpdate', (oldPresence, newPresence) => {
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
}); */

// DB Helpers
/* client.users = new UserManager();

client.users.cache
	.each(user => console.log(user.username))
	.filter(user => user.bot)
	.each(user => console.log(user.username)); */

client.login(token);