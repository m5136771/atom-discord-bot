/*

	Command to initiate a specified quiz for a specified class.

	[ ] Quiz should deliver questions to individual students based on prior performance.
	[ ] Send DM with button for student to init quiz when ready?
	[ ] Allow specifying who is absent?

*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz-deliver')
		.setDescription('for testing'),

	async execute(interaction) {
		await interaction.reply(
			`Testing:
			\nClient Logged in as User ('@A.T.O.M.'): ${interaction.client.user}`,
		);
	},
};