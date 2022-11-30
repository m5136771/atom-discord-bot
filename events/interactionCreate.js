module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isSelectMenu()) return;

		const buttonCommand = interaction.client.buttonCommands.get(interaction.customId);
		const menuCommand = interaction.client.menuCommands.get(interaction.customId);
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command && !buttonCommand && !menuCommand) return;

		if (interaction.isChatInputCommand()) {
			try {
				console.log('executing slash command...');
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
				console.log('executing button command...');
				buttonCommand.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: 'There was an error while executing this button\'s command!',
					ephemeral: true,
				});
			}
		};

		if (interaction.isSelectMenu()) {
			try {
				console.log('executing menu command...');
				menuCommand.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: 'There was an error while executing this menu\'s command!',
					ephemeral: true,
				});
			}
		};

		console.log(`
			${interaction.createdAt}\n
			The interaction named: ${interaction.name} with ID: ${interaction.id} and type: ${interaction.type}\n
			(custom ID: ${interaction.customId}) and token: ${interaction.token}\n
			Command Name: ${interaction.commandName}\n
			Command S
			was triggered by ${interaction.user.tag} (member: ${interaction.member}) in #${interaction.channel.name}.\n
			Guild: ${interaction.guild} with ID: ${interaction.guildId} and locale: ${interaction.guildLocale}`,
		);
	},
};
