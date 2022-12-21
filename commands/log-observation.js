const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

const embed = new EmbedBuilder()
	.setTitle('Behavioral Observation')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/7505/7505050.png')
	.setImage('https://img.freepik.com/premium-vector/informational-flyer-negotiation-office-cartoon_82574-8987.jpg');

const compSelectMenu = new ActionRowBuilder()
	.addComponents([
		new SelectMenuBuilder()
			.setCustomId('select-competency')
			.setPlaceholder('Choose Competency...')
			.addOptions(
				{
					label: 'Teamwork',
					value: 'tw',
				},
				{
					label: 'Logical Thinking',
					value: 'lgt',
				},
				{
					label: 'End-user Focus',
					value: 'euf',
				},
				{
					label: 'Curiosity',
					value: 'cr',
				},
				{
					label: 'Grit',
					value: 'grt',
				},
				{
					label: 'Leadership',
					value: 'lsh',
				},
				{
					label: 'Confidence',
					value: 'cf',
				},
				{
					label: 'Hope',
					value: 'h',
				},
			),
	]);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('log-observation')
		.setDescription('Log a behavioral observation'),

	// customId: 'competency-select',

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [compSelectMenu],
		});
	},
};