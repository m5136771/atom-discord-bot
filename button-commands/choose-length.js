const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const embed = new EmbedBuilder()
	.setColor(0xefef8d)
	.setTitle('Lemonade Stand')
	.setDescription('How long would you like to play?');

const row = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId('seven-days')
			.setLabel('7 Days')
			.setStyle(ButtonStyle.Success),
		new ButtonBuilder()
			.setCustomId('fourteen-days')
			.setLabel('14 Days')
			.setDisabled(true)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('thirty-days')
			.setLabel('30 Days')
			.setDisabled(true)
			.setStyle(ButtonStyle.Danger),
	]);

module.exports = {
	customId: 'choose-length',

	async execute(interaction) {
		await interaction.update({
			ephemeral: true,
			embeds: [embed],
			components: [row],
		});
	},
};