const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const cModel = require('../data/competency-model.json');

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
					label: `${cModel.competencies[0].name}`,
					value: `${cModel.competencies[0].abbrv}`,
				},
				{
					label: `${cModel.competencies[1].name}`,
					value: `${cModel.competencies[1].abbrv}`,
				},
				{
					label: `${cModel.competencies[2].name}`,
					value: `${cModel.competencies[2].abbrv}`,
				},
				{
					label: `${cModel.competencies[3].name}`,
					value: `${cModel.competencies[3].abbrv}`,
				},
				{
					label: `${cModel.competencies[4].name}`,
					value: `${cModel.competencies[4].abbrv}`,
				},
				{
					label: `${cModel.competencies[5].name}`,
					value: `${cModel.competencies[5].abbrv}`,
				},
				{
					label: `${cModel.competencies[6].name}`,
					value: `${cModel.competencies[6].abbrv}`,
				},
				{
					label: `${cModel.competencies[7].name}`,
					value: `${cModel.competencies[7].abbrv}`,
				},
			),
	]);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('log-observation')
		.setDescription('Log a behavioral observation'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [compSelectMenu],
		});
	},
};