const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, time } = require('discord.js');

const date = new Date();
const timeString = time(date);
const relative = time(date, 'R');

const row = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('approve')
			.setLabel('Approve')
			.setDisabled(true)
			.setStyle(ButtonStyle.Primary),
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('Send a button!')
		.addStringOption(option =>
			option.setName('message-id')
				.setDescription('Right-click the target message and Copy ID (requires Developer Mode).')
				.setRequired(true)),

	async execute(interaction) {

		// if person receiving review, change .setDisabled(false)

		await interaction.reply(
			{ content: ` Code Review on ${timeString}\n\n
 
			Developer: @Mr. DiPaolo\n
			Reviewer: @Mr. DiPaolo\n\n
			 
			Biggest Win:  <What they did best>`, ephemeral: true, embeds: [embed], components: [row] },
		);
	},
};