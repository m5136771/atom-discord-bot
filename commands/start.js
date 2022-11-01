const { SlashCommandBuilder } = require('discord.js');
const Character = require('../db/schema/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Create a character and start your journey!')
		.addStringOption((option) =>
			option
				.setName('name')
				.setDescription('Your character\'s name?')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('faction')
				.setDescription('Choose your faction!')
				.setRequired(true)
				.addChoices(
					{ name: 'Faction 1', value: 'Faction 1' },
					{ name: 'Faction 2', value: 'Faction 2' },
				),
		)
		.addStringOption((option) =>
			option
				.setName('color')
				.setDescription('Choose your favorite color!')
				.setRequired(true)
				.addChoices(
					{ name: 'Red', value: 'red' },
					{ name: 'Blue', value: 'blue' },
					{ name: 'Yellow', value: 'yellow' },
				),
		)
		.addStringOption((option) =>
			option
				.setName('class')
				.setDescription('Choose your class!')
				.setRequired(true)
				.addChoices(
					{ name: 'Warrior', value: 'warrior' },
					{ name: 'Mage', value: 'mage' },
					{ name: 'Rogue', value: 'rogue' },
				),
		),

	async execute(interaction) {
		const name = interaction.options.getString('name');
		const faction = interaction.options.getString('faction');
		const fcolor = interaction.options.getString('color');
		const cclass = interaction.options.getString('class');
		
		const intGuild = interaction.guild;
		const intGuildId = interaction.guild.id;
		
		const intUserId = interaction.user.id;

		const newChar = new Character({
			discordId: intUserId,
			discordName: interaction.user.name,

			guild: intGuild,
			guildId: intGuildId,

			character: name,
			faction: faction,
			fcolor: fcolor,
			cclass: cclass,
		});

		await newChar.save();

		await interaction.reply(
			`Yes! That's it! You're **${name}**, the **${cclass}** from **${faction}**!!
			\nBut.. I never knew your favorite color was **${fcolor}**...
			\nNo matter! You're here now! Welcome, **${name}**! And good luck!
			\n
			\nTesting DB: ${newChar}`,
		);
	},
};
