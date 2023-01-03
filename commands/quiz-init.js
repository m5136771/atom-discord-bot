/*

	Command to initiate a specified quiz for a specified class.

	[ ] Quiz should deliver questions to individual students based on prior performance.
		[ ] Send DM with button for student to init quiz when ready? Create listener for keyword in DM/channel?
	[ ] Allow specifying who is absent?
	[ ] Allow specifying who is auditing (with discord role but not in class)?
	[ ] Format and presentation should mirror LinkedIn Skill Assessments.
	[ ] Add an internal timer for 6min (time for 4 questions); Display questions 1 at a time, closing after the time limit.
		Goal here: allow time while doing these to look things up and study. It's likely they'll get questions they don't know how to answer.
		Keeping it to 6 min will still allow a definite "stopping point" for doing this at beginning of class.
	[ ] Make an 'infinite mode' that allows you to continue answering questions until you say stop.

*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Student = require('../db/models/Student');
const { getClassInfo, getMembersWithRole } = require('../helpers');

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Quiz')
	// .setURL('https://discord.js.org/')
	// .setAuthor({ name: 'Mr. DiPaolo', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('You have 7, 14, or 30 days to make as much money as possible! You\'ll have complete control over pricing, quality, inventory, and supplies.')
	// .setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Recipe', value: 'Start with the default recipe, but experiment to find a better one. Make sure you buy enough ingredients, or you won\'t be able to sell!' },
		// This creates a blank space { name: '\u200B', value: '\u200B' },
		{ name: 'Weather', value: 'This playa a big role in customer demand. Read the weather report every day! WHen the temperature is low, or the weather is bad (overcast, cloudy, rain), don\'t expect to sell as much, and buy accordingly. Set your prices higher on hot, muggy days to increase profit, even if you sell less lemonade.' },
		{ name: 'Customer Satisfaction', value: 'As you sell your lemonade, people will decide how much they like or dislike it. If your popularity is low, fewer people will buy, even if the weather is hot and sunny. But if you increase your popularity, you\'ll do okay even when it\'s cold and rainy!' },
		{ name: 'Goal', value: 'At the end of 7, 14, or 30 days, you\'ll see how much money you made. Try to beat your high score!' },
		// { name: 'Inline field title', value: 'Some value here', inline: true },
	);
	// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	// .setImage('https://i.imgur.com/AfFp7pu.png')
	// .setTimestamp()
	// .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz-init')
		.setDescription('for testing')

		.addStringOption(option =>
			option.setName('qname')
				.setDescription('Which quiz to deliver.')
				.setRequired(true)
				.addChoices(
					{ name: 'html', value: 'html' },
					{ name: 'git', value: 'git' },
				),
		)

		.addRoleOption(option =>
			option.setName('role')
				.setDescription('To deliver quiz to whole class.')
				.setRequired(false))

		.addUserOption(option =>
			option.setName('user')
				.setDescription('To deliver quiz to individuals.')
				.setRequired(false),
		),

	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const qName = interaction.options.getString('qName');
		const role = interaction.options.getRole('role');
		const classObj = getClassInfo(role.id.toString());

		if (classObj === null) {
			await interaction.reply({
				content: 'Selected Role is not a class!',
				ephemeral: true,
			});
			console.log(`Error: Role Option (${role.id.toString()}) not a TSS-Class`);
			return;
		};

		const discIds = getMembersWithRole(interaction, role);

		// Get THREE (3) QUESTIONS to send
		// -----------------------
		// 1. look at each student file
		for (const x of discIds) {
			console.log(`Going through array at ${x}`);
			let studentDoc = await Student.findOne({ disc_id: x });
		};

		// 2. if any questions are next_up today, grab them (up to 3 total in quiz)

		// 3. if more questions needed, pull quiz file and grab more that student has never attempted
		const quizName = interaction.options.getRole('role');
		getQuizInfo();

		// 4. send questions 1-by-1 to student through Discord
		if (!user && !role) {
			console.log('No one specified to receive test!');
		} else if (!qName) {
			console.log('No quiz specified!');
		} else if (!user && role) {
			// send questions to each member in class
		} else if (!role && user) {
			// send questions to just this user
		}


		await interaction.reply({
			content: `Testing:
			\nClient Logged in as User ('@A.T.O.M.'): ${interaction.client.user}`, embed: [embed],
		});
	},
};