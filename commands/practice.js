/*

	Command to initiate a quiz for the member calling it.

*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { SAOptionsRow1, SAOptionsRow2 } = require('../assets/action-rows');

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Skill Assessment Practice')
	.setDescription('These questions are designed to help you practice for a future graded assessment.')
	.addFields(
		{ name: '😖 I don\'t know the answers!', value: 'You\'re not expected to. Part of this is to practice your ability to FIND answers when you don\'nt know them.' },
		{ name: '🤔 How will I learn?', value: 'Google the questions you don\'nt know. Ask your teammates. Be curious. Figure it out. Don\'t answer until you\'re sure you know the correct response.' },
		{ name: '⌚ How much time do I have?', value: 'You have 10 minutes to answer any one of these questions, so take your time.' },
		{ name: '🅰️ Which questions are graded?', value: 'Practice questions are not graded; Graded assessments will be done in class, and will be composed of 15 questions *of those **you personally** have already attempted.* No random questions you\'ve never seen before.' },
		{ name: '🧮 How are grades calculated?', value: 'Grades have a lower cap of 50%, and you may get up to 4 questions wrong without penalty.' },
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('practice')
		.setDescription('Practice questions for a Skill Assessment.'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [SAOptionsRow1, SAOptionsRow2],
		});
	},
};