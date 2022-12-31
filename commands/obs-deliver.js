/*

	Command to deliver an observation to a student.

*/

const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('obs-deliver')
		.setDescription('Deliver an observation to a student'),

	async execute(interaction) {
		await interaction.reply(
			{ content: '' },
		);
	},
};