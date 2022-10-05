// const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
// const { buyItem, inventory } = require('../button-commands/seven-days');

/* let descript = 'description';
let fieldDescriptSmall = 'field description';
let fieldDescriptMed = 'field description';
let fieldDescriptBig = 'field description';

let quantitySmall = 0;
let quantityMed = 0;
let quantityBig = 0;

if (buyItem === 'buy-cups') {
	descript = `You have $${inventory.cups} and ${inventory.money}`;
	fieldDescriptSmall = 'You can buy 25 cups for $0.88';
	quantitySmall = 25;
	fieldDescriptMed = 'You can buy 50 cups for $1.57';
	quantityMed = 50;
	fieldDescriptBig = 'You can buy 100 cups for $2.95';
	quantityBig = 100;
} else if (buyItem === 'buy-lemons') {
	descript = `You have $${inventory.lemons} and ${inventory.money}`;
	fieldDescriptSmall = 'You can buy 10 lemons for $0.58';
	quantitySmall = 10;
	fieldDescriptMed = 'You can buy 30 cups for $2.38';
	quantityMed = 30;
	fieldDescriptBig = 'You can buy 75 cups for $4.11';
	quantityBig = 75;
} else if (buyItem === 'buy-sugar') {
	descript = `You have $${inventory.sugar} and ${inventory.money}`;
	fieldDescriptSmall = 'You can buy 8 cups for $0.68';
	quantitySmall = 8;
	fieldDescriptMed = 'You can buy 20 cups for $1.51';
	quantityMed = 20;
	fieldDescriptBig = 'You can buy 48 cups for $3.38';
	quantityBig = 48;
} else if (buyItem === 'buy-ice') {
	descript = `You have $${inventory.ice} and ${inventory.money}`;
	fieldDescriptSmall = 'You can buy 100 ice cubes for $0.85';
	quantitySmall = 100;
	fieldDescriptMed = 'You can buy 250 ice cubes for $2.20';
	quantityMed = 250;
	fieldDescriptBig = 'You can buy 500 cups for $3.74';
	quantityBig = 500;
} else {
	console.error();
	return;
};

const embed = new EmbedBuilder()
	.setColor(0xefef8d)
	.setTitle('Title')
	.setDescription(`${descript}`)
	.addFields(
		{ name: ' ', value: fieldDescriptSmall },
		{ name: ' ', value: fieldDescriptMed },
		{ name: ' ', value: fieldDescriptBig },
	);

const row = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId('buySmall')
			.setLabel(`Buy ${quantitySmall}`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('buyMed')
			.setLabel(`Buy ${quantityMed}`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('buyBig')
			.setLabel(`Buy ${quantityBig}`)
			.setStyle(ButtonStyle.Primary),
	]); */

module.exports = {
	customId: 'buy',
	async execute(interaction) {
		const x = interaction.options;
		console.log(`Sending ${x} with response.`);

		await interaction.update({
			ephemeral: true,
			embeds: [],
			components: [],
		});
	},
};