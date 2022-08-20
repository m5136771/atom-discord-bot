const { SlashCommandBuilder } = require('discord.js');
const CronJob = require('cron').CronJob;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('facepalm')
		.setDescription('Starts a repeating message!'),
	async execute(interaction) {
		const general = interaction.client.channels.cache.get('1001005535929323545');

		const job = new CronJob(
			'0 51 21 * * 5', // cronTime [required] the time to fire
			function onTick() {
				general.send('onTick triggered.');
				console.log('onTick triggered.');
			}, // onTick [required] the function to run at cronTime
			//function onComplete() {
				//general.send('you actually did it.. job is now stopped');
			//}, //onComplete [optional] function called with job.stop()
			true, //start [optional] default is 'false'
			'America/New_York', //timeZone [optional]
		);

		job.start;
		await interaction.reply(`Cron triggered.\nJob: ${job}\ncronTime: ${job.cronTime}\nonTick: ${job.onTick}`);
	},
};