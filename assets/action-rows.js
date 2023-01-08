const { ActionRowBuilder } = require('discord.js');
const { ans1, ans2, ans3, ans4, endButton, nextButton } = require('../assets/buttons');

const ansRow = new ActionRowBuilder()
	.addComponents(ans1, ans2, ans3, ans4);

const contRow = new ActionRowBuilder()
	.addComponents(nextButton, endButton);

module.exports = { ansRow, contRow };