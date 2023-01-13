const { Events } = require('discord.js');

module.exports = {
	name: Events.Error,
	execute(interaction) {
		console.log(`Executed with Error: ${interaction}`);
	},
};