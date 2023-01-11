const { ActionRowBuilder } = require('discord.js');
const {
	ans1, ans2,	ans3, ans4,
	endButton, nextButton,
	agileButton, apcspButton, blenderButton,
	hardwareButton, htmlButton,
	pythonButton, unityButton,
} = require('../assets/buttons');

const ansRow = new ActionRowBuilder()
	.addComponents(ans1, ans2, ans3, ans4);

const contRow = new ActionRowBuilder()
	.addComponents(nextButton, endButton);

const SAOptionsRow1 = new ActionRowBuilder()
	.addComponents(agileButton, apcspButton, blenderButton);

const SAOptionsRow2 = new ActionRowBuilder()
	.addComponents(hardwareButton, htmlButton, pythonButton, unityButton);

module.exports = {
	ansRow,
	contRow,
	SAOptionsRow1,
	SAOptionsRow2,
};