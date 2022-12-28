/*

	Command to analyze quiz results.

	[ ] Allow checking on certain 'stats'.
		[ ] Total attempted
		[ ] Total correct
		[ ] Map of iLevel for all attempted questions
		[ ] EF stats
			[ ] EF average
			[ ] EF median
			[ ] EF mode

*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz-read-results')
		.setDescription('for testing'),

	async execute(interaction) {
		await interaction.reply(
			`Testing:
			\nClient Logged in as User ('@A.T.O.M.'): ${interaction.client.user}`,
		);
	},
};