const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

// v 0.0.1
// Just send a message prompting everyone in the channel to send a message
const embed = new EmbedBuilder()
	.setColor(0x21D4CE)
	.setTitle('Daily Scrum Standup Meeting')
	.setURL('https://scrumguides.org/scrum-guide.html#daily-scrum')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/2620/2620863.png')
	.addFields(
		{ name: 'Due Date', value: 'string', inline: true },
		{ name: 'Class Days Left', value: 'integer', inline: true },
		{ name: 'Sprint Goal', value: 'string', inline: false },
		{ name: 'Answer 3 Questions', value: '• What did you accomplish during the last two classes?\n• What is currently broken that you\'re trying to fix?\n• What is your immediate next step?' }
	)
	.setFooter({ text: '✅ This prompt will determine your daily contribution score.' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily-scrum')
		.setDescription('Start the Daily Scrum Meeting!')
		.addStringOption(option =>
			option.setName('due-date')
				.setDescription('Ex: Monday, Oct 12th')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('days-left')
				.setDescription('How many classes left before presentations?')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('sprint-goal')
				.setDescription('Enter the current sprint goal')
				.setRequired(true)),

	async execute(interaction) {
		const due = interaction.options.getString('due-date');
		embed.data.fields[0].value = due;

		const days = interaction.options.getInteger('days-left');
		if (days >= 4) {
			embed.data.fields[1].value = days;
		} else {
			embed.data.fields[1].value = `⌛ ${days} left!`;
		}

		const goal = interaction.options.getString('sprint-goal');
		embed.data.fields[2].value = goal;

		await interaction.reply({
			ephemeral: false,
			embeds: [embed],
		});
	},
};

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
