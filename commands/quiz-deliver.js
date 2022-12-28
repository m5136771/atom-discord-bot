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