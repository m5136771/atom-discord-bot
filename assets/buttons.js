const { ButtonBuilder, ButtonStyle } = require('discord.js');

// Skill Assessment Options
const agileButton = new ButtonBuilder()
	.setCustomId('agile-next')
	.setLabel('Agile Scrum')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const apcspButton = new ButtonBuilder()
	.setCustomId('apcsp-next')
	.setLabel('AP CSP')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const blenderButton = new ButtonBuilder()
	.setCustomId('blender-next')
	.setLabel('Blender 3D')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const hardwareButton = new ButtonBuilder()
	.setCustomId('hardware-next')
	.setLabel('Hardware')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const htmlButton = new ButtonBuilder()
	.setCustomId('html-next')
	.setLabel('HTML')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);

const pythonButton = new ButtonBuilder()
	.setCustomId('python-next')
	.setLabel('Python')
	.setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const unityButton = new ButtonBuilder()
	.setCustomId('unity-next')
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

// Skill Assessment Continuation Options
const endButton = new ButtonBuilder()
	.setCustomId('sa-practice-end')
	.setLabel('Submit & End')
	.setStyle(ButtonStyle.Success);

const nextButton = new ButtonBuilder()
	.setCustomId('html-next')
	.setLabel('Next Question')
	.setStyle(ButtonStyle.Primary);

module.exports = {
	ans1, ans2,	ans3, ans4,
	endButton, nextButton,
	agileButton, apcspButton, blenderButton,
	hardwareButton, htmlButton,
	pythonButton, unityButton,
};