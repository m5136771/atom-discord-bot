const { Client, SlashCommandBuilder, Presence } = require('discord.js');

// command asks for class name and class length
// sends to channel based on className
// sets presence of students to working for length.

// 1. Remind Sprint info:
// goal; due date; class days(hours) remaining

// 2. Ask series of questions:
// Did yesterday? Plan for today? Problems?
// How close to sprint goal? 0-100%

// 3. Thank for the info. Give reminder info:
// Commit before leaving (daily contribution score)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily-scrum')
		.setDescription('Start the Daily Scrum.'),
	async execute(interaction) {
		// Set the client user's presence
		// Client.user.setPresence({ activities: [{ name: 'with discord.js' }], status: 'idle' });
		await interaction.reply(`${Presence}`);
	},
};
