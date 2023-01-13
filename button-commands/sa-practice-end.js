module.exports = {
	customId: 'sa-practice-end',
	description: 'Ends practice session.',

	async execute(interaction) {

		await interaction.update(
			{ content: 'Thanks for Practicing!', ephemeral: true, embeds: [], components: [] },
		).catch(console.error);
	},
};