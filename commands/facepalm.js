import { weekNumber, chosenImagePath } from '../constants';

const path = require('node:path');
const { SlashCommandBuilder } = require('discord.js');
const CronJob = require('cron').CronJob;

const fileName = path.basename(chosenImagePath);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('facepalm')
		.setDescription('Starts a repeating message!'),
	async execute(interaction) {
		const general = interaction.client.channels.cache.get('1001005535929323545');

		const job = new CronJob(
			'0 * * * * *',
			function onTick() {
				general.send(`onTick triggered.\nThe current week number is ${weekNumber} and the img for this week is stored in ${chosenImagePath}.`)
					.then(message => console.log(`Sent message: ${message.content}`))
					.catch(console.error);
				general.send({
					files: [{
						attachment: chosenImagePath,
						name: fileName,
						description: 'description of image here'
					}]
				})
					.then(console.log)
					.catch(console.error);
			},
			true,
			'America/New_York',
		);

		job.start;
		await interaction.reply(`Cron triggered.\nJob: ${job}\ncronTime: ${job.cronTime}\nonTick: ${job.onTick}`);
	},
};