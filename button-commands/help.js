const { EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder()
	.setColor(0xefef8d)
	.setTitle('Help')
	.addFields(
		{ name: 'Inventory', value: 'It\'s hugely important to manage your inventory well, or you\'ll quickly go out of business. How much you need depends on a few things.' },
		{ name: 'Number of customers', value: 'If the weather is bad, and your price is high, don\'t expect more than 15-25 customers. But if the weather is hot and clear, and your prices are reasonable, expect 50-75.' },
		{ name: 'Cups & Ice', value: 'You need one paper cup per customer, plus however many ice cubes you decide to put in each cup.' },
		{ name: 'Sugar & Lemons', value: 'First, figure out how many pitchers you\'ll need for the customers you expect. If you\'re not using much ice, a pitcher can fill about 12 cups. With lots of ice, a pitcher will fill 20-25 cups. Then figure out how many lemons and cups of sugar you\'ll need for that many pitchers!\nIt\'s always better to buy a little extra than to not have enough.' },
		{ name: 'A Few More Tips', value: 'Your paper cups won\'t go bad, so always have plenty. Your ice will melt at the end of the day, so don\'t buy much more than you can sell. Lemons and sugar will usually be OK the next day, but sometimes spoil!' },
	);

module.exports = {
	customId: 'help',

	async execute(interaction) {
		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
		});
	},
};