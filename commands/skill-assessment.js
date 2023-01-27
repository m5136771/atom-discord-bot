/*

	Command to initiate a graded skill assessment for the member calling it.

*/

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { agileGradedButton, apcspGradedButton, blenderGradedButton, hardwareGradedButton, htmlGradedButton, pythonGradedButton, unityGradedButton } = require('../assets/buttons');

const GradedSAOptionsRow1 = new ActionRowBuilder()
	.addComponents(agileGradedButton, apcspGradedButton, blenderGradedButton);

const GradedSAOptionsRow2 = new ActionRowBuilder()
	.addComponents(hardwareGradedButton, htmlGradedButton, pythonGradedButton, unityGradedButton);

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Graded Skill Assessment')
	.setDescription('This will begin a **graded** skill assessment.')
	.addFields(
		{ name: '⌚ How much time do I have?', value: '90 seconds per question. If you take too long, the answer will be counted as incorrect.' },
		{ name: '🧮 How are grades calculated?', value: 'You can get 4 questions wrong and still end with 100%.' },
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skill-assessment')
		.setDescription('Begin a Graded Skill Assessment.'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [GradedSAOptionsRow1, GradedSAOptionsRow2],
		});
	},
};