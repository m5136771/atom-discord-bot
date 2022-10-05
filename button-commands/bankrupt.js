module.exports = {
	customId: 'bankrupt',

	async execute(interaction) {
		await interaction.update({
			ephemeral: true,
			content: `Thanks for playing ${interaction.user.tag}!  You tried...`,
			embeds: [],
			components: [],
		});
	},
};