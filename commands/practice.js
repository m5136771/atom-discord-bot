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
		{ name: 'Where do the questions come from?', value: 'I use a question bank to hold tons of practice questions related to the subject. These questions will be pulled from the question bank unless you have questions to answer in your personal queue.' },
		{ name: 'What is my Personal Queue?', value: 'These questions use spaced repetition to help you learn; You should expect to see the same questions periodically depending on how well the algorithm thinks you know the answers (questions you get right will show up less frequently).' },
		{ name: 'How does Spaced Repetition work?', value: 'Every time you attempt a question, I will log your response, its correctness, and how long it took to answer. I\'ll use that data to calculate how "easy" the question was for you to answer. When you get it right, the algorithm will determine when to show it to you next. The time between recurring questions will be longer and longer depending on your "win streak." If you get one wrong, the streak will reset and so will the repetition intervals.' },
		{ name: 'Goal', value: 'The goal is to **learn**. If you need to Google something or look into your notes or ask a friend, please do, but remember that just finding the answer without understanding the answer will negatively affect your ability to perform well on the graded assessment in class; Take time to learn the answers now whilw it\'s still "practice."' },
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('practice')
		.setDescription('Practice questions for a Skill Assessment.'),

	async execute(interaction) {

		await interaction.deferReply({ ephemeral: true });
		await interaction.editReply({
			ephemeral: true,
			embeds: [embed],
			components: [SAOptionsRow1, SAOptionsRow2],
		});
	},
};