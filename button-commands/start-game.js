module.exports = {
	customId: 'start-game',

	async execute(interaction) {
		await interaction.reply(
			'Starting game soon...',
		);
	},
};