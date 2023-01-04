/* eslint-disable no-inline-comments */
/*

	Button Command triggers when selecting quiz name from Init cmd
    [ ] Pull one question from bank and send to student ephemerally

*/

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Quiz = require('../db/models/Quiz');
const Student = require('../db/models/Student');
const { getRandomInt } = require('../helpers');
const quizName = 'html';

const row = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('next-question')
			.setLabel('Next Question')
			// .setDisabled(true)
			.setStyle(ButtonStyle.Primary),
	)
	.addComponents(
		new ButtonBuilder()
			.setCustomId('end-quiz')
			.setLabel('End Quiz')
			.setDisabled(true)
			.setStyle(ButtonStyle.Success),
	);

module.exports = {
	customId: 'html',
	description: 'Begins HTML daily quiz.',

	async execute(interaction) {

		// Get THREE (3) QUESTIONS to send
		// -----------------------
		const today = new Date();
		const dailyQuestions = [];
		const student = await Student.findOne({
			disc_id: interaction.user.id,
		}).exec(); // pulls student file matching user.id
		console.log(`found ${student.name}!`);

		const quizDoc = await Quiz.findOne({
			abbrv: quizName,
		}).exec(); // pulls quiz file that matches button clicked
		console.log(`found ${quizDoc.abbrv}!`);

		// 1. Pull "next_up" from student file, add to dailyQuestions
		// 2. If < 3 questions, pull more from db. Of all questions, can't be:
		// 3.	Already attempted (because if it has, it has a next_up date)
		// 4. Add to daily Questions, up to 3.
		// 5. Receive student response, calc correctness, ef, next_up
		// 6. print results

		// 1. Pull "next_up" from student file, add to dailyQuestions
		if (!student.qresults) {
			console.log('qresults is null!');
			return;
		} else {
			for (const x in student.qresults.questions) {
				if (x.next_up === today) {
					dailyQuestions.push(x);
					console.log(x);
				}
			}
		};

		console.log(dailyQuestions);
		console.log('finished here.. next if statement...');

		if (dailyQuestions.length >= 3) { // If < 3 questions, pull more from db.
			console.log('dailyQuestions is full!');
			return;
		} else {
			const limit = 3 - dailyQuestions.length;
			console.log(`Looking for ${limit} questions...`);

			// 3. Go through all quiz questions and remove Already attempted (_id exists in Student.qresults.questions[x].question_id) (because if it has, it has a next_up date)
			// 4. Add to daily Questions, up to 3.
			const questions = quizDoc.questions; // array [] of questions in quiz
			// console.log(student.qresults);
			// console.log(student.qresults[0]);
			const attempted = student.qresults[0].questions; // array[] of questions attempted by student
			console.log(`Array of attempted: ${attempted}`);

			// grab a question at random.
			const repeated = [];
			for (; dailyQuestions.length < 3;) {
				const ranNum = getRandomInt(1, questions.length);
				console.log(ranNum);

				// check if it has been attempted.
				if (attempted.includes(ranNum) || repeated.includes(ranNum)) {
					// console.log('Value exists!');
				} else {
					// if not, add to daily questions.
					// console.log('Value does not exists!');
					dailyQuestions.push(questions[ranNum]);
					// console.log(dailyQuestions);
				}
				repeated.push(ranNum);
				// repeat until full
			}

			console.log(dailyQuestions);
		};

		// 4. send questions to student
		await interaction.update(
			{ content: 'it worked!', components: [row] },
		);
	},
};