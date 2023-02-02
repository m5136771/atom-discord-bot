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

const { ButtonBuilder, ButtonStyle } = require('discord.js');

// Agile
const agileButton = new ButtonBuilder()
	.setCustomId('agile-next')
	.setLabel('Agile Scrum')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const agileNextButton = new ButtonBuilder()
	.setCustomId('agile-next')
	.setLabel('Next Question')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const agileGradedButton = new ButtonBuilder()
	.setCustomId('agile-graded')
	.setLabel('Agile Scrum')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const agileGradedNextButton = new ButtonBuilder()
	.setCustomId('agile-graded')
	.setLabel('Next Question')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);


// AP CSP
const apcspButton = new ButtonBuilder()
	.setCustomId('apcsp-next')
	.setLabel('AP CSP')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const apcspNextButton = new ButtonBuilder()
	.setCustomId('apcsp-next')
	.setLabel('Next Question')
	.setStyle(ButtonStyle.Primary);

const apcspGradedButton = new ButtonBuilder()
	.setCustomId('apcsp-graded')
	.setLabel('AP CSP')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const apcspGradedNextButton = new ButtonBuilder()
	.setCustomId('apcsp-graded')
	.setLabel('Next Question')
	.setStyle(ButtonStyle.Primary);


// Blender
const blenderButton = new ButtonBuilder()
	.setCustomId('blender-next')
	.setLabel('Blender 3D')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const blenderNextButton = new ButtonBuilder()
	.setCustomId('blender-next')
	.setLabel('Blender 3D')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const blenderGradedButton = new ButtonBuilder()
	.setCustomId('blender-graded')
	.setLabel('Blender 3D')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const blenderGradedNextButton = new ButtonBuilder()
	.setCustomId('blender-graded')
	.setLabel('Blender 3D')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);


// Hardware
const hardwareButton = new ButtonBuilder()
	.setCustomId('hardware-next')
	.setLabel('Hardware')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const hardwareNextButton = new ButtonBuilder()
	.setCustomId('hardware-next')
	.setLabel('Hardware')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const hardwareGradedButton = new ButtonBuilder()
	.setCustomId('hardware-graded')
	.setLabel('Hardware')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const hardwareGradedNextButton = new ButtonBuilder()
	.setCustomId('hardware-graded')
	.setLabel('Hardware')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);


// HTML
const htmlButton = new ButtonBuilder()
	.setCustomId('html-next')
	.setLabel('HTML')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const htmlNextButton = new ButtonBuilder()
	.setCustomId('html-next')
	.setLabel('Next Question')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const htmlGradedButton = new ButtonBuilder()
	.setCustomId('html-graded')
	.setLabel('HTML')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const htmlGradedNextButton = new ButtonBuilder()
	.setCustomId('html-graded')
	.setLabel('Next Question')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);


// Python
const pythonButton = new ButtonBuilder()
	.setCustomId('python-next')
	.setLabel('Python')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const pythonNextButton = new ButtonBuilder()
	.setCustomId('python-next')
	.setLabel('Next Question')
	.setStyle(ButtonStyle.Primary);

const pythonGradedButton = new ButtonBuilder()
	.setCustomId('python-graded')
	.setLabel('Python')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const pythonGradedNextButton = new ButtonBuilder()
	.setCustomId('python-graded')
	.setLabel('Next Question')
	.setStyle(ButtonStyle.Primary);


// Unity
const unityButton = new ButtonBuilder()
	.setCustomId('unity-next')
	.setLabel('Unity')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const unityNextButton = new ButtonBuilder()
	.setCustomId('unity-next')
	.setLabel('Unity')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const unityGradedButton = new ButtonBuilder()
	.setCustomId('unity-graded')
	.setLabel('Unity')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const unityGradedNextButton = new ButtonBuilder()
	.setCustomId('unity-graded')
	.setLabel('Unity')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);


// Answer Options
const ans1 = new ButtonBuilder()
	.setCustomId('a')
	.setLabel('A')
	.setStyle(ButtonStyle.Primary);

const ans2 = new ButtonBuilder()
	.setCustomId('b')
	.setLabel('B')
	.setStyle(ButtonStyle.Primary);

const ans3 = new ButtonBuilder()
	.setCustomId('c')
	.setLabel('C')
	.setStyle(ButtonStyle.Primary);

const ans4 = new ButtonBuilder()
	.setCustomId('d')
	.setLabel('D')
	.setStyle(ButtonStyle.Primary);

module.exports = {
	ans1, ans2,	ans3, ans4,

	agileButton, agileGradedButton, agileNextButton, agileGradedNextButton,
	apcspButton, apcspGradedButton, apcspNextButton, apcspGradedNextButton,
	blenderButton, blenderGradedButton, blenderNextButton, blenderGradedNextButton,
	hardwareButton, hardwareGradedButton, hardwareNextButton, hardwareGradedNextButton,
	htmlButton, htmlGradedButton, htmlNextButton, htmlGradedNextButton,
	pythonButton, pythonGradedButton, pythonNextButton, pythonGradedNextButton,
	unityButton, unityGradedButton, unityNextButton, unityGradedNextButton,
};