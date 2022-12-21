const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js');

/* [ ] Add a 'Back' Button */

// Embeds for each competency
const twEmbed = new EmbedBuilder()
	.setTitle('Teamwork')
	.setDescription('Description of the Teamwork Competency')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/1534/1534938.png')
	.setImage('https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg');

const lgtEmbed = new EmbedBuilder()
	.setTitle('Logical Thinking')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/1534/1534938.png')
	.setImage('https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg');

const eufEmbed = new EmbedBuilder()
	.setTitle('End-user Focus')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/1534/1534938.png')
	.setImage('https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg');

const crEmbed = new EmbedBuilder()
	.setTitle('Curiosity')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/1534/1534938.png')
	.setImage('https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg');

const grtEmbed = new EmbedBuilder()
	.setTitle('Grit')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/1534/1534938.png')
	.setImage('https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg');

const lshEmbed = new EmbedBuilder()
	.setTitle('Leadership')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/1534/1534938.png')
	.setImage('https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg');

const cfEmbed = new EmbedBuilder()
	.setTitle('Confidence')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/1534/1534938.png')
	.setImage('https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg');

const hEmbed = new EmbedBuilder()
	.setTitle('Hope')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/1534/1534938.png')
	.setImage('https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg');


// Behavior Menus for each competency
const twBehaviorSelectMenu = new ActionRowBuilder()
	.addComponents([
		new SelectMenuBuilder()
			.setCustomId('tw-behavior-select')
			.setPlaceholder('Most pronounced behavior...')
			.addOptions(
				{
					label: 'Openly shares work with others.',
					value: 'tw_1',
				},
				{
					label: 'Actively looks for opportunities to help.',
					value: 'tw_2',
				},
				{
					label: 'Knows how to give and receive honest, helpful feedback.',
					value: 'tw_3',
				},
				{
					label: 'Maximizes the benefits of collaborative tools.',
					value: 'tw_4',
				},
				{
					label: 'Expresses opinions with humility.',
					value: 'tw_5',
				},
			),
	]);

const lgtBehaviorSelectMenu = new ActionRowBuilder()
	.addComponents([
		new SelectMenuBuilder()
			.setCustomId('select-behavior')
			.setPlaceholder('Most pronounced behavior...')
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

const eufBehaviorSelectMenu = new ActionRowBuilder()
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

const crBehaviorSelectMenu = new ActionRowBuilder()
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

const grtBehaviorSelectMenu = new ActionRowBuilder()
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

const lshBehaviorSelectMenu = new ActionRowBuilder()
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

const cfBehaviorSelectMenu = new ActionRowBuilder()
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

const hBehaviorSelectMenu = new ActionRowBuilder()
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
		const comp = interaction.values[0];

		if (comp === 'tw') {
			await interaction.update({
				embeds: [twEmbed],
				components: [twBehaviorSelectMenu],
			});

		} else if (comp === 'lgt') {
			await interaction.update({
				embeds: [lgtEmbed],
				components: [lgtBehaviorSelectMenu],
			});

		} else if (comp === 'euf') {
			await interaction.update({
				embeds: [eufEmbed],
				components: [eufBehaviorSelectMenu],
			});

		} else if (comp === 'cr') {
			await interaction.update({
				embeds: [crEmbed],
				components: [crBehaviorSelectMenu],
			});

		} else if (comp === 'grt') {
			await interaction.update({
				embeds: [grtEmbed],
				components: [grtBehaviorSelectMenu],
			});

		} else if (comp === 'lsh') {
			await interaction.update({
				embeds: [lshEmbed],
				components: [lshBehaviorSelectMenu],
			});

		} else if (comp === 'cf') {
			await interaction.update({
				embeds: [cfEmbed],
				components: [cfBehaviorSelectMenu],
			});

		} else if (comp === 'h') {
			await interaction.update({
				embeds: [hEmbed],
				components: [hBehaviorSelectMenu],
			});

		} else {
			console.log('didnt work');
			await interaction.update({
				embeds: [],
				components: [],
			});
		}
	},
};