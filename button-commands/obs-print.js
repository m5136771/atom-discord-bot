/*

	Template

*/

const { EmbedBuilder } = require("discord.js");
const student = require('../commands/obs-write');

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Observation')
	// .setURL('https://discord.js.org/')
	.setAuthor({ name: 'Mr. DiPaolo', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
	.setDescription(`Observation given for ${student}.`)
	// .setThumbnail('https://i.imgur.com/AfFp7pu.png')
	/* .addFields(
		{ name: 'Recipe', value: 'Start with the default recipe, but experiment to find a better one. Make sure you buy enough ingredients, or you won\'t be able to sell!' },
		// This creates a blank space { name: '\u200B', value: '\u200B' },
		{ name: 'Weather', value: 'This playa a big role in customer demand. Read the weather report every day! WHen the temperature is low, or the weather is bad (overcast, cloudy, rain), don\'t expect to sell as much, and buy accordingly. Set your prices higher on hot, muggy days to increase profit, even if you sell less lemonade.' },
		{ name: 'Customer Satisfaction', value: 'As you sell your lemonade, people will decide how much they like or dislike it. If your popularity is low, fewer people will buy, even if the weather is hot and sunny. But if you increase your popularity, you\'ll do okay even when it\'s cold and rainy!' },
		{ name: 'Goal', value: 'At the end of 7, 14, or 30 days, you\'ll see how much money you made. Try to beat your high score!' },
		// { name: 'Inline field title', value: 'Some value here', inline: true }
	); */
	// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	// .setImage('https://i.imgur.com/AfFp7pu.png')
	// .setTimestamp()
	// .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })

module.exports = {
	customId: 'obs-print',

	async execute(interaction) {

		await interaction.update({
			content: ' ',
			embeds: [embed],
			components: [],
		});
	},
};