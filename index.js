const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
//const token = process.env['token']
const { token, mongo_uri } = require('./config.json');
const { mongoose } = require('mongoose');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences] });
const serverLogChannel = client.channels.cache.get('1036805916223340646');

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

client.on('presenceUpdate', (oldPresence, newPresence) => {
	if (!oldPresence) {
		console.log(`New Status for ${newPresence.user.tag}:  ${newPresence.status}`);
	} else {
		console.log(`New Status for id: ${serverLogChannel} tag: ${newPresence.user.tag}:  ${oldPresence.status} is now ${newPresence.status}`);
	};

	try {
	  client.channels.cache.get('1036805916223340646')
	  	.send(
		`New Status for id: ${serverLogChannel} tag: ${newPresence.user.tag}:  ${oldPresence.status} is now ${newPresence.status}`
		);
	} catch (error) {
	  console.log(error);
	}
});


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	
	client.commands.set(command.data.name, command);
}	

client.buttonCommands = new Collection();
const buttonCommandsPath = path.join(__dirname, 'button-commands');
const buttonCommandFiles = fs.readdirSync(buttonCommandsPath).filter(file => file.endsWith('.js'));

for (const file of buttonCommandFiles) {
	const filePath = path.join(buttonCommandsPath, file);
	const buttonCommand = require(filePath);

	client.buttonCommands.set(buttonCommand.customId, buttonCommand);
}

client.menuCommands = new Collection();
const menuCommandsPath = path.join(__dirname, 'menu-commands');
const menuCommandFiles = fs.readdirSync(menuCommandsPath).filter(file => file.endsWith('.js'));

for (const file of menuCommandFiles) {
	const filePath = path.join(menuCommandsPath, file);
	const menuCommand = require(filePath);

	client.menuCommands.set(menuCommand.customId, menuCommand);
}

/* connect(mongo, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Connected to MongoDB')
}).catch((err) => {
	console.log('Unable to connect to MongoDB Database.\nError: ' + err);
}); */

client.login(token);