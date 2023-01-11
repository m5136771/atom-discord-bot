/*

	Command to begin a formal, graded skill assessment. (In-class)

    [ ] The format and presentation should mirror the daily quizzes.
    [ ] Only grab questions already attempted AND with an EF > 2. (If less than 15, grab more of EF > 1.8, and so on.)

*/

const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('sa-init')
		.setDescription('Begin a Graded Skill Assessment.'),

	async execute(interaction) {
		await interaction.reply(
			{ content: 'It worked!', ephemeral: true },
		);
	},
};