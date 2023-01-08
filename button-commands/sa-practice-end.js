/*

	Button Command triggers when student answers all questions and clicks 'end quiz' button

*/

module.exports = {
	customId: 'sa-practice-end',
	description: 'End the Practice Session',

	async execute(interaction) {
		await interaction.update(
			{ content: 'Thanks for Practicing!', ephemeral: true, embeds: [], components: [] },
		);
	},
};