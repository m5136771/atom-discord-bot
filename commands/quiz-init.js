/*

	Command to initiate a specified quiz for the individual calling it.

	[ ] Quiz should deliver questions to individual students based on prior performance.
		[ ] Send DM with button for student to init quiz when ready? Create listener for keyword in DM/channel?
	[ ] Allow specifying who is absent?
	[ ] Allow specifying who is auditing (with discord role but not in class)?
	[ ] Format and presentation should mirror LinkedIn Skill Assessments.
	[ ] Add an internal timer for 6min (time for 4 questions); Display questions 1 at a time, closing after the time limit.
		Goal here: allow time while doing these to look things up and study. It's likely they'll get questions they don't know how to answer.
		Keeping it to 6 min will still allow a definite "stopping point" for doing this at beginning of class.
	[ ] Make an 'infinite mode' that allows you to continue answering questions until you say stop.

*/

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Quiz')
	.setDescription('These questions are designed to help you practice for a future graded assessment.')
	.addFields(
		{ name: 'Where do the questions come from?', value: 'I use a question bank to hold tons of practice questions related to the subject. These questions will be pulled from the question bank unless you have questions to answer in your personal queue.' },
		{ name: 'What is my Personal Queue?', value: 'These questions use spaced repetition to help you learn; You should expect to see the same questions periodically depending on how well the algorithm thinks you know the answers (questions you get right will show up less frequently).' },
		{ name: 'How does Spaced Repetition work?', value: 'Every time you attempt a question, I will log your response, its correctness, and how long it took to answer. I\'ll use that data to calculate how "easy" the question was for you to answer. When you get it right, the algorithm will determine when to show it to you next. The time between recurring questions will be longer and longer depending on your "win streak." If you get one wrong, the streak will reset and so will the repetition intervals.' },
		{ name: 'Goal', value: 'The goal is to **learn**. If you need to Google something or look into your notes or ask a friend, please do, but remember that just finding the answer without understanding the answer will negatively affect your ability to perform well on the graded assessment in class; Take time to learn the answers now whilw it\'s still "practice."' },
	);

const row = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('html-next')
			.setLabel('HTML')
			// .setDisabled(true)
			.setStyle(ButtonStyle.Primary),
	)
	.addComponents(
		new ButtonBuilder()
			.setCustomId('agile-next')
			.setLabel('Agile')
			// .setDisabled(true)
			.setStyle(ButtonStyle.Primary),
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz-init')
		.setDescription('for testing'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [row],
		});
	},
};