const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

let behaviorSelectMenu = new ActionRowBuilder();

const twBehaviorSelectMenu = new ActionRowBuilder()
	.addComponents([
		new SelectMenuBuilder()
			.setCustomId('select-behavior')
			.setPlaceholder('Choose the most pronounced bahavior...')
			.addOptions(
				{
					label: 'Option 1',
					value: 'op1',
				},
				{
					label: 'Option 2',
					value: 'op2',
				},
			),
	]);

const lgtBehaviorSelectMenu = new ActionRowBuilder()
	.addComponents([
		new SelectMenuBuilder()
			.setCustomId('select-behavior')
			.setPlaceholder('Choose the most pronounced bahavior...')
			.addOptions(
				{
					label: 'Option 1',
					value: 'op1',
				},
				{
					label: 'Option 2',
					value: 'op2',
				},
			),
	]);

module.exports = {
	customId: 'select-competency',

	async execute(interaction) {

		if (interaction.values[0] === 'tw') {
			behaviorSelectMenu = twBehaviorSelectMenu;
		} else if (interaction.values[0] === 'lgt') {
			behaviorSelectMenu = lgtBehaviorSelectMenu;
		} else {
			console.log('didnt work');
		}

		await interaction.update({
			components: [behaviorSelectMenu],
		});
	},
};