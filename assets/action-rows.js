const { ActionRowBuilder } = require('discord.js');
const {
	ans1, ans2,	ans3, ans4,

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
	.addComponents(agileNextButton);

const agileGradedContRow = new ActionRowBuilder()
	.addComponents(agileGradedNextButton);

const apcspContRow = new ActionRowBuilder()
	.addComponents(apcspNextButton);

const apcspGradedContRow = new ActionRowBuilder()
	.addComponents(apcspGradedNextButton);

const blenderContRow = new ActionRowBuilder()
	.addComponents(blenderNextButton);

const blenderGradedContRow = new ActionRowBuilder()
	.addComponents(blenderGradedNextButton);

const hardwareContRow = new ActionRowBuilder()
	.addComponents(hardwareNextButton);

const hardwareGradedContRow = new ActionRowBuilder()
	.addComponents(hardwareGradedNextButton);

const htmlContRow = new ActionRowBuilder()
	.addComponents(htmlNextButton);

const htmlGradedContRow = new ActionRowBuilder()
	.addComponents(htmlGradedNextButton);

const pythonContRow = new ActionRowBuilder()
	.addComponents(pythonNextButton);

const pythonGradedContRow = new ActionRowBuilder()
	.addComponents(pythonGradedNextButton);

const unityContRow = new ActionRowBuilder()
	.addComponents(unityNextButton);

const unityGradedContRow = new ActionRowBuilder()
	.addComponents(unityGradedNextButton);


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