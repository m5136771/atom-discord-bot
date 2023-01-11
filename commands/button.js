/*

	Basic button command template.

*/

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const row = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('Click me!')
			// .setDisabled(true)
			.setStyle(ButtonStyle.Primary),
	);

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org')
	.setDescription('Some description here');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('Send a button!'),

	async execute(interaction) {
		await interaction.reply(
			{ content: 'I think you should,', ephemeral: true, embeds: [embed], components: [row] },
		);
	},
};