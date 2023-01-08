const { ButtonBuilder, ButtonStyle } = require('discord.js');

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

const endButton = new ButtonBuilder()
	.setCustomId('quiz-end')
	.setLabel('Submit & End Quiz')
	.setStyle(ButtonStyle.Success);

const nextButton = new ButtonBuilder()
	.setCustomId('html-next')
	.setLabel('Next Question')
	.setStyle(ButtonStyle.Primary);

module.exports = { ans1, ans2, ans3, ans4, endButton, nextButton };