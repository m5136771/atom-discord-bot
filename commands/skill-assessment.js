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

/*

	Command to initiate a graded skill assessment for the member calling it.

*/

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { agileGradedButton, apcspGradedButton, blenderGradedButton, hardwareGradedButton, htmlGradedButton, pythonGradedButton, unityGradedButton } = require('../assets/buttons');

const GradedSAOptionsRow1 = new ActionRowBuilder()
	.addComponents(agileGradedButton, apcspGradedButton, blenderGradedButton);

const GradedSAOptionsRow2 = new ActionRowBuilder()
	.addComponents(hardwareGradedButton, htmlGradedButton, pythonGradedButton, unityGradedButton);

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Graded Skill Assessment')
	.setDescription('This will begin a **graded** skill assessment.')
	.addFields(
		{ name: '⌚ How much time do I have?', value: '90 seconds per question. If you take too long, the answer will be counted as incorrect.' },
		{ name: '🧮 How are grades calculated?', value: 'You can get 4 questions wrong and still end with 100%.' },
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skill-assessment')
		.setDescription('Begin a Graded Skill Assessment.'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [GradedSAOptionsRow1, GradedSAOptionsRow2],
		});
	},
};