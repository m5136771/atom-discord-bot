/* eslint-disable no-inline-comments */
/*

	Button Command triggers when selecting quiz name from Init cmd
	[ ]	Measure time spent on each question
	[ ] Log response to db

*/

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const Quiz = require('../db/models/Quiz');
const Student = require('../db/models/Student');
const { getRandomInt } = require('../helpers');
const quizName = 'html';

const ans1 = new ButtonBuilder()
	.setCustomId('a')
	.setLabel('A')
	// .setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const ans2 = new ButtonBuilder()
	.setCustomId('b')
	.setLabel('B')
	// .setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const ans3 = new ButtonBuilder()
	.setCustomId('c')
	.setLabel('C')
	// .setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const ans4 = new ButtonBuilder()
	.setCustomId('d')
	.setLabel('D')
	// .setDisabled(true)
	.setStyle(ButtonStyle.Primary);

const endButton = new ButtonBuilder()
	.setCustomId('end-quiz')
	.setLabel('Submit & End Quiz')
	.setStyle(ButtonStyle.Success);

const nextButton = new ButtonBuilder()
	.setCustomId('next-question')
	.setLabel('Next Question')
	.setStyle(ButtonStyle.Primary);

const row1 = new ActionRowBuilder()
	.addComponents(ans1, ans2, ans3, ans4);

const row2 = new ActionRowBuilder()
	.addComponents(nextButton, endButton);

module.exports = {
	customId: 'html-next',
	description: 'Moves to next question.',

	async execute(interaction) {

		// Get ONE (1) QUESTION to send
		// -----------------------
		const today = new Date();
		const nextQuestion = [];

		const student = await Student.findOne({
			disc_id: interaction.user.id,
		}).exec(); // pulls student file matching user.id
		console.log(`found ${student.name}!`);

		const quizDoc = await Quiz.findOne({
			abbrv: quizName,
		}).exec(); // pulls quiz file that matches button clicked
		console.log(`found ${quizDoc.abbrv}!`);

		// 1. Pull "next_up" from student file, add to dailyQuestions
		if (!student.qresults) {
			console.log('qresults is null!');
			return;
		} else {
			for (let x = 0; nextQuestion.length === 1; x++) {
				if (student.qresults.questions[x].next_up === today) {
					nextQuestion.push(x);
					console.log(x);
				}
			}
		};

		console.log(`Daily Questions: [${nextQuestion}]`);

		if (nextQuestion.length === 1) { // If < 3 questions, pull more from db.
			console.log('nextQuestion exists; moving forward...');
			return;
		} else {
			const limit = 1;
			console.log(`Looking for ${limit} question...`);

			// 3. Go through all quiz questions and remove Already attempted (_id exists in Student.qresults.questions[x].question_id) (because if it has, it has a next_up date)
			// 4. Add to daily Questions, up to 3.
			const questions = quizDoc.questions; // array [] of questions in quiz
			// console.log(student.qresults);
			// console.log(student.qresults[0]);
			const attempted = student.qresults[0].questions; // array[] of questions attempted by student
			console.log(`Array of attempted: ${attempted}`);

			// grab a question at random
			const ranNum = getRandomInt(1, questions.length);
			console.log(ranNum);

			// check if it has been attempted.
			if (attempted.includes(ranNum)) {
				console.log('Value exists!');
			} else {
				// if not, add to daily questions.
				// console.log('Value does not exists!');
				nextQuestion.push(questions[ranNum]);
				// console.log(dailyQuestions);
			}
		}
		console.log(nextQuestion);

		/* nextQuestion-Example-Array---------------------
			[
				{
				  choices: { a: 'readonly', b: 'max', c: 'form', d: 'spellcheck' },
				  qNum: 9,
				  text: 'What is NOT a valid attribute for the `<textarea>` element?',
				  qtype: 'Multiple Choice',
				  answer: 'b',
				  mass_ef: 2.5,
				  _id: new ObjectId("63acc49584541ff20bec35c1")
				},
			  ] */

		// 4. send question to student
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('HTML Skill Assessment Practice')
			.setDescription(`${nextQuestion[0].text}\n**A**: ${nextQuestion[0].choices.a}\n**B**: ${nextQuestion[0].choices.b}\n**C**: ${nextQuestion[0].choices.c}\n**D**: ${nextQuestion[0].choices.d}\n`)
			/* .addFields(
				{ name: 'A', value: `**A**: ${nextQuestion[0].choices.a}`, inline: true },
				{ name: 'B', value: `**B**: ${nextQuestion[0].choices.b}`, inline: true },
				{ name: 'C', value: `**C**: ${nextQuestion[0].choices.c}`, inline: true },
				{ name: 'D', value: `**D**: ${nextQuestion[0].choices.d}`, inline: true },
			) */;
		// const filter = click => click.customId === 'ans1' || click.customId === 'ans2';

		const collector = interaction.channel.createMessageComponentCollector({ time: 15000, max: 1 });
		const correctResponse = nextQuestion[0].answer;

		collector.on('collect', async interaction => {
			if (interaction.customId === correctResponse) {
				console.log('Correct response logged!');
				await interaction.update(
					{ content: `Answer ${interaction.customId.toUpperCase()} recorded.`, components: [row2] },
				);
			} else {
				console.log('Oh no! Incorrect!!');
				await interaction.update(
					{ content: `Answer ${interaction.customId.toUpperCase()} recorded.`, components: [row2] },
				);
			}
		});

		collector.on('end', collected => {
			console.log('It worked!');
		});

		await interaction.update(
			{ ephemeral: true, embeds: [embed], components: [row1] },
		);
	},
};