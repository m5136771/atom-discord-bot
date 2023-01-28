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

const { ActionRowBuilder } = require('discord.js');
const {
	ans1, ans2,	ans3, ans4,

	endButton, endGradedButton,

	agileButton, agileGradedButton, agileNextButton, agileGradedNextButton,
	apcspButton, apcspGradedButton, apcspNextButton, apcspGradedNextButton,
	blenderButton, blenderGradedButton, blenderNextButton, blenderGradedNextButton,
	hardwareButton, hardwareGradedButton, hardwareNextButton, hardwareGradedNextButton,
	htmlButton, htmlGradedButton, htmlNextButton, htmlGradedNextButton,
	pythonButton, pythonGradedButton, pythonNextButton, pythonGradedNextButton,
	unityButton, unityGradedButton, unityNextButton, unityGradedNextButton,
} = require('../assets/buttons');

const ansRow = new ActionRowBuilder()
	.addComponents(ans1, ans2, ans3, ans4);


// Skills
const agileContRow = new ActionRowBuilder()
	.addComponents(agileNextButton, endButton);

const agileGradedContRow = new ActionRowBuilder()
	.addComponents(agileGradedNextButton, endGradedButton);

const apcspContRow = new ActionRowBuilder()
	.addComponents(apcspNextButton, endButton);

const apcspGradedContRow = new ActionRowBuilder()
	.addComponents(apcspGradedNextButton, endGradedButton);

const blenderContRow = new ActionRowBuilder()
	.addComponents(blenderNextButton, endButton);

const blenderGradedContRow = new ActionRowBuilder()
	.addComponents(blenderGradedNextButton, endGradedButton);

const hardwareContRow = new ActionRowBuilder()
	.addComponents(hardwareNextButton, endButton);

const hardwareGradedContRow = new ActionRowBuilder()
	.addComponents(hardwareGradedNextButton, endGradedButton);

const htmlContRow = new ActionRowBuilder()
	.addComponents(htmlNextButton, endButton);

const htmlGradedContRow = new ActionRowBuilder()
	.addComponents(htmlGradedNextButton, endGradedButton);

const pythonContRow = new ActionRowBuilder()
	.addComponents(pythonNextButton, endButton);

const pythonGradedContRow = new ActionRowBuilder()
	.addComponents(pythonGradedNextButton, endGradedButton);

const unityContRow = new ActionRowBuilder()
	.addComponents(unityNextButton, endButton);

const unityGradedContRow = new ActionRowBuilder()
	.addComponents(unityGradedNextButton, endGradedButton);


// Continuation Rows
const SAOptionsRow1 = new ActionRowBuilder()
	.addComponents(agileButton, apcspButton, blenderButton);

const SAOptionsRow2 = new ActionRowBuilder()
	.addComponents(hardwareButton, htmlButton, pythonButton, unityButton);

const GradedSAOptionsRow1 = new ActionRowBuilder()
	.addComponents(agileGradedButton, apcspGradedButton, blenderGradedButton);

const GradedSAOptionsRow2 = new ActionRowBuilder()
	.addComponents(hardwareGradedButton, htmlGradedButton, pythonGradedButton, unityGradedButton);

module.exports = {
	ansRow,

	agileContRow,
	agileGradedContRow,
	apcspContRow,
	apcspGradedContRow,
	blenderContRow,
	blenderGradedContRow,
	hardwareContRow,
	hardwareGradedContRow,
	htmlContRow,
	htmlGradedContRow,
	pythonContRow,
	pythonGradedContRow,
	unityContRow,
	unityGradedContRow,

	SAOptionsRow1,
	SAOptionsRow2,
	GradedSAOptionsRow1,
	GradedSAOptionsRow2,
};