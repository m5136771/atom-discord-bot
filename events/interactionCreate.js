/* A.T.O.M. - A modern tool for high school education
 * Copyright (C) 2023  Michael A. DiPaolo
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
