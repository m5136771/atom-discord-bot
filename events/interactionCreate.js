const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	execute(interaction) {
		/* if (interaction.member.id != 804824020251705344) {
			interaction.reply({
				content: `Sorry ${interaction.member.displayName}, you're not able to use my commands!`,
				ephemeral: true,
			});
			return;
		}; */

		if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isSelectMenu()) return;

		const buttonCommand = interaction.client.buttonCommands.get(interaction.customId);
		const menuCommand = interaction.client.menuCommands.get(interaction.customId);
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command && !buttonCommand && !menuCommand) return;

		if (interaction.isChatInputCommand()) {
			try {
				console.log(`╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌\n⤷ 😀 ${interaction.member.displayName}: Executing 〈 / ${interaction.commandName} 〉 slash command in ⟦ #${interaction.channel.name} ⟧\n`);
				command.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: `🚫 There was an error while executing 〈 / ${interaction.commandName} 〉 in ⟦ #${interaction.channel.name} ⟧\n`,
					ephemeral: true,
				});
			}
		};

		if (interaction.isButton()) {
			try {
				console.log(`╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌\n⤷ 😀 ${interaction.member.displayName}: Executing 〈⦿  ${interaction.customId} 〉 button command in ⟦ #${interaction.channel.name} ⟧\n`);
				buttonCommand.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: `🚫 There was an error while executing 〈 ⦿ ${interaction.customId} 〉 in ⟦ #${interaction.channel.name} ⟧\n`,
					ephemeral: true,
				});
			}
		};

		if (interaction.isSelectMenu()) {
			try {
				console.log(`╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌\n⤷ 😀 ${interaction.member.displayName}: Executing 〈 ☰ ${interaction.customId} 〉 menu command in ⟦ #${interaction.channel.name} ⟧\n`);
				menuCommand.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: `🚫 There was an error while executing 〈 ☰ ${interaction.customId} 〉 in ⟦ #${interaction.channel.name} ⟧\n`,
					ephemeral: true,
				});
			}
		};
	},
};
