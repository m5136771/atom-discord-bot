const myToken = process.env['token']
const myGuild = process.env['guildId']
const myClient = process.env['clientId']
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`),
	new SlashCommandBuilder().setName('user').setDescription(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(myToken);

rest.put(Routes.applicationGuildCommands(myClient, myGuild), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);