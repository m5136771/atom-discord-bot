const { ActionRowBuilder } = require('discord.js');
const {
	ans1, ans2,	ans3, ans4,
	endButton,
	apcspNextButton, htmlNextButton, pythonNextButton,
	agileButton, apcspButton, blenderButton,
	hardwareButton, htmlButton,
	pythonButton, unityButton,
} = require('../assets/buttons');

const ansRow = new ActionRowBuilder()
	.addComponents(ans1, ans2, ans3, ans4);

const apcspContRow = new ActionRowBuilder()
	.addComponents(apcspNextButton, endButton);

const htmlContRow = new ActionRowBuilder()
	.addComponents(htmlNextButton, endButton);

const pythonContRow = new ActionRowBuilder()
	.addComponents(pythonNextButton, endButton);

const SAOptionsRow1 = new ActionRowBuilder()
	.addComponents(agileButton, apcspButton, blenderButton);

const SAOptionsRow2 = new ActionRowBuilder()
	.addComponents(hardwareButton, htmlButton, pythonButton, unityButton);

module.exports = {
	ansRow,
	apcspContRow,
	htmlContRow,
	pythonContRow,
	SAOptionsRow1,
	SAOptionsRow2,
};