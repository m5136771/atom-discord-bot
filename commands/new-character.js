const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
		.setName('new-character')
	  .setDescription('Create a character!')
	  .addStringOption(option => option.setName('name').setDescription('Your character\'s name?').setRequired(true))
    .addStringOption(option => option.setName('faction').setDescription('Choose your faction!').setRequired(true)
    .addChoices(
				{ name: 'Faction 1', value: 'Faction 1' },
				{ name: 'Faction 2', value: 'Faction 2' },
			))
    .addStringOption(option => option.setName('favorite-color').setDescription('Choose your favorite color!').setRequired(true)
    .addChoices(
				{ name: 'Red', value: 'red' },
				{ name: 'Blue', value: 'blue' },
				{ name: 'Yellow', value: 'yellow' },
			))
    .addStringOption(option => option.setName('char-class').setDescription('Choose your class!').setRequired(true)
    .addChoices(
				{ name: 'Warrior', value: 'warrior' },
				{ name: 'Mage', value: 'mage' },
				{ name: 'Rogue', value: 'rogue' },
			)),
  
  async execute(interaction) {
    const name = interaction.options.getString('name');
    const faction = interaction.options.getString('faction');
    const fcolor = interaction.options.getString('favorite-color');
    const cclass = interaction.options.getString('char-class');
    
		await interaction.reply(`Yes! That's it! You're **${name}**, the **${cclass}** from **${faction}**!! But.. I never knew your favorite color was **${fcolor}**... \nNo matter! You're here now! Welcome, **${name}**! And good luck!`);
	},
};