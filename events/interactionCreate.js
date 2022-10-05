module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

		const buttonCommand = interaction.client.buttonCommands.get(interaction.customId);
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command && !buttonCommand) return;

		if (interaction.isChatInputCommand()) {
			try {
				command.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		};

		if (interaction.isButton()) {
			try {
				buttonCommand.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: 'There was an error while executing this button\'s command!',
					ephemeral: true,
				});
			}
		};

		console.log(
			`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`,
		);
	},
};
