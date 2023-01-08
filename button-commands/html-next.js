/* eslint-diQuestionble no-inline-comments */
/*

	Button Command triggers when selecting quiz name from Init cmd && when continuing practice questions
	[ ] Log response to db

*/

const { EmbedBuilder, ComponentType } = require('discord.js');
const Attempt = require('../db/models/Attempt');
const Question = require('../db/models/Question');
const Student = require('../db/models/Student');
const { getRandomInt, easinessCalc, efCalc, daysToNext, newDate, lastEf, docSave } = require('../helpers/misc');

const { ansRow, contRow } = require('../assets/action-rows');

module.exports = {
	customId: 'html-next',
	description: 'Moves to next question.',

	async execute(interaction) {

		// Log Start Time
		const today = new Date();
		const startTime = today;
		console.log(`Start time: ${startTime}`);

		// Find Student in DB
		const student = await Student.findOne({
			disc_id: interaction.user.id,
		}).exec();
		console.log(`Student: ${student.name}\nStudent ID: ${student._id}`);
		const studentId = student._id;

		let nextQuestion = undefined;

		// 1. Pull questions, if any, from "next_up"
		// next_up info is logged into Attempt, which links to student and question
		// 1. find oldest Attempt doc next_up today linked to this Student
		await Attempt
			.findOne()
			.where('next_up', today)
			.where('student', studentId)
			.sort({ ['updatedAt:']: 1 })
			// sort by 'first in; first out'

			.then(
				(doc) => {
					if (doc === null) {
						console.log('Nothing to see here...');
						return;
					} else {
						const questionDue = Question
							.findById(doc.qs._id);
						console.log(`questionDue is: ${questionDue}`);
						nextQuestion = doc;
					}
				},
				(err) => {
					console.log(err);
				},
			).catch(console.error);

		// 2. IF !next_up, Pull from DB
		if (!nextQuestion) {
			console.log('Querying DB for count...');
			const queryForCount = await Question
				.countDocuments()
				.where('tags').in(['html'])
				.where('atmp_by').ne(studentId);

			// grab a question at random
			const ranNum = getRandomInt(1, queryForCount);
			console.log(`Random number: ${ranNum} out of ${queryForCount}`);

			console.log('Querying DB for question...');
			const questionDocs = await Question
				.findOne()
				.where('tags').in(['html'])
				.where('atmp_by').ne(studentId)
				.skip(ranNum);

			if (questionDocs === null) {
				await interaction.update(
					{ content: 'You\'re insane!! You answered every question at least once!!!', ephemeral: true, embeds: [], components: [] },
				);
				console.log('No more quiz questions.. ending quiz.');
				return;
			}

			console.log(`Skipped ${ranNum} and found question with Question ID: ${questionDocs._id}!`);
			nextQuestion = questionDocs;

			// Log Question in Student doc as Attempted
			questionDocs.atmp_by = studentId;
			docSave(questionDocs);
		} else {
			console.log(`Question ${nextQuestion} is ready; moving forward`);
		};

		// 3. Create new Attempt Doc in DB
		const atmp = new Attempt({
			student: student._id,
			graded: false,
			qs: nextQuestion._id,
		});

		const attemptId = atmp._id;

		console.log(`Creating new Attempt Doc: ${atmp}`);
		docSave(atmp);

		// 4. send question to student
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('HTML Skill Assessment Practice')
			.setDescription(`${nextQuestion.text}\n**A**: ${nextQuestion.choices.a}\n**B**: ${nextQuestion.choices.b}\n**C**: ${nextQuestion.choices.c}\n**D**: ${nextQuestion.choices.d}\n`);

		const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 90000, max: 1 });
		const correctResponse = nextQuestion.ans;
		console.log(`Correct ans is: ${nextQuestion.ans.toUpperCase()}`);

		const lastAtmp = await Attempt
			.findOne()
			.where('qs', nextQuestion._id)
			.where('student', studentId)
			.sort({ ['createdAt:']: -1 });
		console.log(`Last Attempt found: ${lastAtmp}`);

		const efPrev = await lastEf(lastAtmp);

		const newAtmp = await Attempt.findById(attemptId);

		collector.on('collect', i => {
			const endTime = new Date();
			console.log(`End time: ${endTime}`);
			const seconds = ((endTime - startTime) / 1000).toFixed(1);
			console.log(`Button pressed was: 〈⦿  ${i.customId.toUpperCase()} 〉`);


			if (i.customId === correctResponse) {
				console.log(`✅ Correct response logged! ⌚ Time: ${seconds}`);
				const ease = easinessCalc(true, seconds);
				const newEF = efCalc(efPrev, ease);
				const newWstreak = newAtmp.wstreak += 1;
				const newInt = daysToNext(newWstreak, newEF);
				const nextDate = newDate(today, newInt);


				newAtmp.ans = true;
				newAtmp.ans_sec = seconds;
				newAtmp.ease = ease;

				newAtmp.wstreak = newWstreak;
				newAtmp.lstreak = 0;
				newAtmp.ef = newEF;
				newAtmp.interval = newInt;
				newAtmp.next_up = nextDate;

				console.log(`Updating DB Attempt ID: ${newAtmp._id}\nNew EF: ${newEF}\nWin Streak: ${newAtmp.wstreak}\nNext Up: ${newAtmp.next_up}\n`);
				docSave(newAtmp);

				i.update(
					{ content: `Answer ${i.customId.toUpperCase()} recorded.`, embeds: [], components: [contRow] },
				);
			} else {
				console.log(`⛔ Oh no! Incorrect!! ⌚ Time: ${seconds}`);
				const ease = easinessCalc(false, seconds);
				const newEF = efCalc(efPrev, ease);
				const newLstreak = newAtmp.lstreak += 1;
				const newWstreak = 0;
				const newInt = daysToNext(newWstreak, newEF);
				const nextDate = newDate(today, newInt);

				newAtmp.ans = false;
				newAtmp.ans_sec = seconds;
				newAtmp.ease = ease;

				newAtmp.wstreak = newWstreak;
				newAtmp.lstreak = newLstreak;
				newAtmp.ef = newEF;
				newAtmp.interval = newInt;
				newAtmp.next_up = nextDate;

				console.log(`Updating DB Attempt ID: ${newAtmp._id}\nNew EF: ${newEF}\nNext Up: ${newAtmp.next_up}\n`);
				docSave(newAtmp);

				i.update(
					{ content: `Answer ${i.customId.toUpperCase()} recorded.`, embeds: [], components: [contRow] },
				);
			}
		});

		// eslint-diQuestionble-next-line no-unused-vars
		collector.on('end', collected => {
			console.log(`Collected ${collected.size} interactions.`);
		});

		await interaction.update(
			{ content: ' ', ephemeral: true, embeds: [embed], components: [ansRow] },
		);
	},
};