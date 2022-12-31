/*

	Template

*/

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

const printButton = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('obs-print')
			.setLabel('Print')
			// .setDisabled(true)
			.setStyle(ButtonStyle.Primary),
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('obs-write')
		.setDescription('template')

		.addUserOption(option =>
			option.setName('student')
				.setDescription('Who is this for?')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('competency')
				.setDescription('Choose competency.')
				.setRequired(true)
				.addChoices(
					{ name: 'Teamwork', value: 'Teamwork' },
					{ name: 'Logical Thinking', value: 'Logical Thinking' },
					{ name: 'End-user Focus', value: 'End-user Focus' },
					{ name: 'Curiosity', value: 'Curiosity' },
					{ name: 'Grit', value: 'Grit' },
					{ name: 'Leadership', value: 'Leadership' },
					{ name: 'Confidence', value: 'Confidence' },
					{ name: 'Hope', value: 'Hope' },
				)
		)
		.addStringOption(option =>
			option.setName('behavior')
				.setDescription('Copy/paste most representative option from cModel.')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('when')
				.setDescription('When did you see this happen?')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('observation')
				.setDescription('What did you see?')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('score')
				.setDescription('How do you evaluate this behavior?')
				.setRequired(true)
				.addChoices(
					{ name: 'Surpasses Expectations', value: 'Surpasses Expectations' },
					{ name: 'Meets Expectations', value: 'Meets Expectations' },
					{ name: 'Nearing Expectations', value: 'Nearing Expectations' },
					{ name: 'Inconsistent with Expectations', value: 'Inconsistent with Expectations' },
					{ name: 'Evidence Lacking', value: 'Evidence Lacking' },
				)
		)
		.addStringOption(option =>
			option.setName('recommendation')
				.setDescription('What is your recommendation?')
				.setRequired(true)
		),

	async execute(interaction) {
		const student = interaction.options.getUser('student');
		const competency = interaction.options.getString('competency');
		const behavior = interaction.options.getString('behavior');
		const when = interaction.options.getString('when');
		const observation = interaction.options.getString('observation');
		const score = interaction.options.getString('score');
		const recommendation = interaction.options.getString('recommendation');
		
		await interaction.reply({ 
			content:
			`Observation written for: ${student}.\nCompetency: ${competency}.\nBehavior: ${behavior}.\nObserved: ${when}.\nDescription: ${observation}\nScore: ${score}.\nRecommendation: ${recommendation}\n`,
			ephemeral: true,
			components: [printButton]
		});
	},
};