const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder, SlashCommandBuilder } = require('discord.js');

const classMenu = new ActionRowBuilder()
	.addComponents(
		new SelectMenuBuilder()
			.setCustomId('select')
			.setPlaceholder('Choose a class...')
			.addOptions(
				{
					label: '2. Web Dev',
					description: 'Web Development (Block 2)',
					value: 'web_dev',
				},
				{
					label: '3. Internet of Things',
					description: 'Internet of Things (Block 3)',
					value: 'iot',
				},
				{
					label: '4. AP-CSP',
					description: 'AP Computer Science Principles (Block 4)',
					value: 'web_dev',
				},
				{
					label: '6. Game Dev',
					description: 'Game Development (Block 6)',
					value: 'game_dev',
				},
			),
	);

const sprintButtons = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('path_to_success')
			.setLabel('See Path to Success')
			.setStyle(ButtonStyle.Success),

		new ButtonBuilder()
			.setCustomId('sprint_presentation_rubric')
			.setLabel('Sprint Presentation Rubric')
			.setStyle(ButtonStyle.Primary),

		new ButtonBuilder()
			.setCustomId('trello_board')
			.setLabel('Trello Board')
			.setStyle(ButtonStyle.Primary),

		new ButtonBuilder()
			.setCustomId('sprint_reminders')
			.setLabel('What is a Sprint?')
			.setStyle(ButtonStyle.Danger),
	);

// Ephemeral message that helps create the message

const embed = new EmbedBuilder()
	.setColor(0x21D4CE)
	.setTitle('New Sprint Builder')
	.setDescription('Let\'s build a message to announce a new sprint.')
	.setURL('https://scrumguides.org/scrum-guide.html#the-sprint')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/2620/2620863.png');
	/* .addFields(
		{ name: 'The Project', value: `{projectName}`, inline: true },
		{ name: 'Scrum Alchemist', value: '@mention', inline: true },
		{ name: 'User Story', value: 'string', inline: false },
	)
	.setFooter({ text: '✅ This prompt will determine your daily contribution score.' }) */

const dScrumEmbed = new EmbedBuilder()
	.setColor(0x21D4CE)
	.setTitle('Daily Scrum Standup Meeting')
	.setURL('https://scrumguides.org/scrum-guide.html#daily-scrum')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/2620/2620863.png')
	.addFields(
		{ name: 'Due Date', value: 'string', inline: true },
		{ name: 'Class Days Left', value: 'integer', inline: true },
		{ name: 'Sprint Goal', value: 'string', inline: false },
		{ name: 'Answer 3 Questions', value: '• What did you accomplish during the last two classes?\n• What is currently broken that you\'re trying to fix?\n• What is your immediate next step?' },
	)
	.setFooter({ text: '✅ This prompt will determine your daily contribution score.' });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('sprint')
		.setDescription('Commands related to sprint management')

		.addSubcommand(subcommand =>
			subcommand
				.setName('create')
				.setDescription('Set up a new sprint.'),
		)

		.addSubcommand(subcommand =>
			subcommand
				.setName('daily-scrum')
				.setDescription('Set up a new sprint.')
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
		),

	async execute(interaction) {
		if (interaction.commandName === 'sprint') {
			if (interaction.options.getSubcommand() === 'create') {
				await interaction.reply(
					{ ephemeral: true, content: 'Oh, hello there.' },
				);
			} else if (interaction.options.getSubcommand() === 'daily-scrum') {
				const due = interaction.options.getString('due-date');
				dScrumEmbed.data.fields[0].value = due;

				const days = interaction.options.getInteger('days-left');
				if (days >= 4) {
					dScrumEmbed.data.fields[1].value = days;
				} else {
					dScrumEmbed.data.fields[1].value = `⌛ ${days} left!`;
				}

				const goal = interaction.options.getString('sprint-goal');
				dScrumEmbed.data.fields[2].value = goal;

				await interaction.reply({
					ephemeral: true,
					embeds: [dScrumEmbed],
				});
			}
		} else {
			await interaction.reply('Fail.');
		}
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
