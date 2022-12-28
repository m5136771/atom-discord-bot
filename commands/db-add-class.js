/* eslint-disable no-inline-comments */
/*

	Command to add class information to student DB docs.
	- Also adds students to DB if no entry exists.

	[ ] Fix needed: If student in more than one class, schema only allows one

*/

const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Student = require('../database/Student');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('db-add-class')
		.setDescription('Add everyone in channel to DB')

		.addRoleOption(option =>
			option.setName('role')
				.setDescription('Add all users with this role to DB.')
				.setRequired(true)),

	async execute(interaction) {
		const roleOption = interaction.options.getRole('role');
		let classObj = null;

		// Check is a class?
		function isClass(roleId) {
			switch (roleId) {
			case '1014391186510856202':
				classObj = config.classInfo.b2;
				break;
			case '1014391620323528704':
				classObj = config.classInfo.b3;
				break;
			case '1014391439309938718':
				classObj = config.classInfo.b4;
				break;
			case '1014391323027062794':
				classObj = config.classInfo.b6;
				break;

			default:
				console.log(`Selected Role (${roleId}) is not a class!`);
				break;
			}
		}

		isClass(roleOption.id.toString());

		if (classObj === null) {
			await interaction.reply({
				content: `Selected Role Id (${roleOption.id.toString()}) is not a class!`,
				ephemeral: true,
			});
			return;
		};

		// get Disc_ids for everyone with class role
		const membersColl = await interaction.guild.members.fetch(); // get all members in guild
		const discIds = []; // empty array to hold member ids

		membersColl
			.filter(member => member.roles.cache.has(roleOption.id)) // filter out all members that don't match the specified role
			.each(member => discIds.push(member.id)); // for each one remaining, add to the prepared array
		console.log(`Collection of member ids: ${discIds.toString()}`); // make sure it worked

		if (discIds.length === 0) {
			await interaction.reply({
				content: 'No members found with this class role.',
				ephemeral: true,
			});
			return;
		};

		// check member ids to see if already in db
		const addedMembers = [];
		const allMembers = [];

		for (const x of discIds) { // iterate through array
			console.log(`Going through array at ${x}`);
			let studentDoc = await Student.findOne({ disc_id: x }); // search DB for entry with matching discord id
			// check found entry for class details

			const newMember = await interaction.guild.members.fetch(x); // isolate Discord Member Object
			console.log(`Dealing with guild member: ${newMember.user.id}`);

			if (!studentDoc && !newMember.user.bot) { // if no match in DB (&& member not a bot), add to DB
				console.log('No match in DB found... creating entry.');

				studentDoc = await new Student({
					_id: mongoose.Types.ObjectId(),
					disc_id: newMember.user.id.toString(),
					disc_tag: `${newMember.user.username}#${newMember.user.discriminator}`,
					class: {
						block: classObj.block,
						name: classObj.name,
						abbrv: classObj.abbrv,
						role: classObj.role,
					},
				});
				await studentDoc.save().catch(console.error);
				addedMembers.push(studentDoc.disc_tag);
				allMembers.push(studentDoc.disc_tag);
				console.log(`Entry complete. New document: ${studentDoc}`);

			} else { // if match found, print it
				allMembers.push(studentDoc.disc_tag);
				console.log(`Match found in DB: ${studentDoc}`);
			};
		};

		await interaction.reply({
			content: `Database updated successfully.\n\nAdded ${addedMembers.join('\r\n')} \n\nFull Class List:\n--${allMembers.join('\r\n--')}\n`,
			ephemeral: true,
		});
	},
};