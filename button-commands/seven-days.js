const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const game = {
	day: 0, temperature: 58, weather: 'Overcast',
};

const inventory = {
	money: 20.00,
	cups: 0,
	lemons:0,
	sugar: 0,
	ice: 0,
};


const embed = new EmbedBuilder()
	.setColor(0xefef8d)
	.setTitle(`Day ${game.day}`)
	.setDescription(`You have $${inventory.money} and:`)
	.addFields(
		{ name: 'Paper Cups', value: `${inventory.cups}`, inline: true },
		{ name: 'Lemons', value: `${inventory.lemons}`, inline: true },
		{ name: 'Cups of Sugar', value: `${inventory.sugar}`, inline: true },
		{ name: 'Cubes of Ice', value: `${inventory.ice}`, inline: true },
	)
	.setFooter({ text: `It is ${game.weather} outside, and the temperature is ${game.temperature}°F` });

const row1 = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId('bankrupt')
			.setLabel('Bankrupt!')
			.setStyle(ButtonStyle.Danger),
		new ButtonBuilder()
			.setCustomId('continue')
			.setLabel('Continue')
			.setStyle(ButtonStyle.Success),
		new ButtonBuilder()
			.setCustomId('help')
			.setLabel('Help!')
			.setStyle(ButtonStyle.Secondary),
	]);

const row2 = new ActionRowBuilder()
	.addComponents([
		new SelectMenuBuilder()
			.setCustomId('buy')
			.setPlaceholder('Buy more...')
			.setMinValues(0)
			.setMaxValues(4)
			.addOptions(
				{
					label: 'Buy Cups',
					value: 'buy-cups',
					emoji: {
						name: '🥤',
					},
				},
				{
					label: 'Buy Lemons',
					value: 'buy-lemons',
					emoji: {
						name: '🍋',
					},
				},
				{
					label: 'Buy Sugar',
					value: 'buy-sugar',
					emoji: {
						name: '🍬',
					},
				},
				{
					label: 'Buy Ice',
					value: 'buy-ice',
					emoji: {
						name: '🧊',
					},
				},
			),
	]);

module.exports = {
	customId: 'seven-days',

	async execute(interaction) {
		// const buyItem = interaction.customId;
		// const y = interaction.options[0].value;
		// console.log(`Sending ${y} with response.`);

		await interaction.update({
			ephemeral: true,
			embeds: [embed],
			components: [row1, row2],
		});
	},
};