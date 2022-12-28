const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('db-student-update')
		.setDescription('Add everyone in channel to DB'),

	async execute(interaction) {
		// with given Disc_id, check for missing info in DB

		// update missing info

		// optional inputs for non-retrievable info
		// year

		await interaction.reply(
			`Testing:
			\nClient Logged in as User ('@A.T.O.M.'): ${interaction.client.user}`,
		);
	},
};