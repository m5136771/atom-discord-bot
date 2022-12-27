const { SlashCommandBuilder } = require('discord.js');
const Student = require('../database/Student');
const mongoose = require('mongoose');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('database')
		.setDescription('Returns info from DB'),

	async execute(interaction) {
		let studentProfile = await Student.findOne({ disc_id: interaction.user.id });

		if (!studentProfile) {
			studentProfile = await new Student({
				_id: mongoose.Types.ObjectId(),
				disc_id: interaction.user.id,
				name: interaction.user.username,
			});

			await studentProfile.save().catch(console.error);
			await interaction.reply({
				content: `Student Name: ${studentProfile.name}`
			});

			console.log(studentProfile);

		} else {
			await interaction.reply({
				content: `Already exists!!\n
				Student Name: ${studentProfile.name}`
			});

			console.log(studentProfile);
		}
	}
};