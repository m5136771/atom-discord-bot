/*

	Button Command triggers when selecting quiz name from Init cmd && when continuing practice questions

*/

const { EmbedBuilder, ComponentType } = require('discord.js');
const Attempt = require('../db/models/Attempt');
const Question = require('../db/models/Question');
const Student = require('../db/models/Student');
const { getRandomInt, easinessCalc, efCalc, daysToNext, newDate, docSave, hoursToNext } = require('../helpers/misc');
const { ansRow, agileContRow } = require('../assets/action-rows');

const saName = 'agile';
const secPerQuestion = 90000;

module.exports = {
	customId: `${saName}-next`,
	description: 'Moves to next question.',

	async execute(interaction) {

		// Log Start Time
		const startTime = new Date();
		const startTimeISO = startTime.toISOString();
		// console.log(`Start time: ${startTime}`);
		// console.log(`startTimeISO: ${startTimeISO}`);

		// Find Student in DB
		const student = await Student.findOne({
			disc_id: interaction.user.id,
		}).exec();
		// console.log(`Student: ${student.disc_tag}\nStudent ID: ${student._id}`);
		const studentId = student._id;

		let nextQuestion = undefined;

		// 1. Pull questions, if any, from "next_up" (next_up info is logged into Attempt Docs, which links to student and question)
		// IF 'reattempted: false', meaning it has only displayed once since creation
		// and set the one found to 'reattempted: true' so we know this attempt has been sent a second time.
		// NOTE: This will search attempts from ANY set of questions. Anything this student has due will show up, no matter which quiz selected.
		const nextUp = await Attempt
			.findOneAndUpdate({ r_atmp: true })
			.where('next_up').lte(startTimeISO)
			.where('student', studentId)
			.where('tags').in([`${saName}`])
			.where('r_atmp', false)
			.sort({ next_up: -1 })
			// sort by 'first in; first out'

			.then(
				(doc) => {
					if (doc === null) {
						// console.log('Next Up Queue Empty...');
					} else {
						nextQuestion = doc.qs._id;
						// console.log(`Attempt doc found for next_up.lte(today): ${nextQuestion}\nnextUp = Mongo Doc`);
						return doc;
					}
				},
				(err) => {
					console.log(err);
				},
			).catch(console.error);

		if (!nextUp) {
			// console.log(`nextUp: ${nextUp}...`);
		} else {
			const questionDue = await Question
				.findOneAndUpdate({ $inc: { tot_atmp: 1 } })
				.where('_id', nextQuestion);
			// console.log(`questionDue is: ${questionDue}`);
			nextQuestion = questionDue;
			// console.log(`Next Question found in Next_up: ${nextQuestion}`);
		}

		// 2. IF !nextQuestion yet, Pull from DB:
		if (!nextQuestion) {
			// console.log('Querying DB for count...');
			const queryForCount = await Question
				.countDocuments()
				.where('tags').in([`${saName}`])
				.where('atmp_by').ne(studentId);

			// console.log(`queryForCount = ${queryForCount}`);

			if (queryForCount === 0) {
				const nextInLine = await Attempt
					.findOne()
					.where('student', studentId)
					.where('r_atmp', false)
					.where('next_up').exists(true)
					.sort({ next_up: 1 });

				const n = new Date(nextInLine.next_up);
				await interaction.editReply(
					{ content: `You're insane!! You answered every question at least once and you have nothing due today!\nThe next question you have due is for ${n.toDateString()} at ${n.toTimeString()}`, ephemeral: true, embeds: [], components: [] },
				);
				console.log('No more quiz questions.. ending quiz.');
				return;
			}

			// grab a question at random
			const ranNum = getRandomInt(0, queryForCount - 1);
			// console.log(`Random number: ${ranNum} out of ${queryForCount}`);

			// console.log('Querying DB for question...');
			const questionDocs = await Question
				.findOne()
				.where('tags').in([`${saName}`])
				.where('atmp_by').ne(studentId)
				.skip(ranNum);

			// console.log(`Question text found: ${questionDocs.text}`);
			// console.log(`Total Attempts: ${questionDocs.tot_atmp}`);

			// console.log(`Skipped ${ranNum} and found question with Question ID: ${questionDocs._id}!`);
			nextQuestion = questionDocs;

			// Log Question in Student doc as Attempted
			questionDocs.tot_atmp += 1;
			console.log(`Total Attempts: ${questionDocs.tot_atmp}`);
			questionDocs.atmp_by = studentId;
			docSave(questionDocs);
		} else {
			// console.log(`Question ${nextQuestion} is ready; moving forward`);
		};

		const questionId = nextQuestion._id;

		// 3. Create new Attempt Doc in DB
		const atmp = new Attempt({
			student: student._id,
			graded: false,
			qs: questionId,
		});

		const attemptId = atmp._id;

		// console.log('Creating new Attempt Doc');
		docSave(atmp);

		// 4. send question to student
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Your Question')
			.setDescription(`${nextQuestion.text}\n**A**: ${nextQuestion.choices.a}\n**B**: ${nextQuestion.choices.b}\n**C**: ${nextQuestion.choices.c}\n**D**: ${nextQuestion.choices.d}\n`);

		// const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 90000, max: 1 });
		const correctResponse = nextQuestion.ans;
		// console.log(`Correct ans is: ${nextQuestion.ans.toUpperCase()}`);

		const lastAtmp = await Attempt
			.findOne()
			.where('qs', questionId)
			.where('student', studentId)
			.sort({ createdAt: -1 });
		// console.log(`Last Attempt found: ${lastAtmp}`);

		let lastWstreak = 0;
		let lastLstreak = 0;
		let lastEf = 2.5;
		if (!lastAtmp) {
			// console.log(`lastAtmp: ${lastAtmp}`);
		} else {
			lastWstreak = lastAtmp.wstreak;
			lastLstreak = lastAtmp.lstreak;
			lastEf = lastAtmp.ef;
			// console.log(`lastAtmp wstreak: ${lastWstreak}`);
			// console.log(`lastAtmp lstreak: ${lastLstreak}`);
			// console.log(`lastAtmp ef: ${lastEf}`);

			lastAtmp.r_atmp = true;
			docSave(lastAtmp);
		};

		const newAtmp = await Attempt.findById(attemptId);

		const buttonPressMsg = await interaction.editReply(
			{ content: ' ', ephemeral: true, embeds: [embed], components: [ansRow], fetchReply: true },
		).catch(console.error);


		buttonPressMsg.awaitMessageComponent({ componentType: ComponentType.Button, time: secPerQuestion, max: 1 })
			.then(i => {
				const endTime = new Date();
				// console.log(`End time: ${endTime}`);
				const seconds = ((endTime - startTime) / 1000).toFixed(1);
				// console.log(`Button pressed was: 〈⦿  ${i.customId.toUpperCase()} 〉`);

				if (i.customId === correctResponse) {
					console.log(`✅ Correct response logged! ⌚ Time: ${seconds}`);
					const ease = easinessCalc(true, seconds);
					// console.log(`Ease calc: ${ease}`);
					// console.log(`lastEf: ${lastEf}`);
					const newEF = efCalc(lastEf, ease);
					// console.log(`newEF: ${newEF}`);
					// console.log(`Old Lose Streak${lastLstreak}`);
					const newLstreak = 0;
					// console.log(`New Lose Streak${newLstreak}`);
					console.log(`Old Winstreak${lastWstreak}`);
					const newWstreak = lastWstreak + 1;
					console.log(`New Winstreak${newWstreak}`);
					const newInt = daysToNext(newWstreak, newEF);
					const nextDate = newDate(startTime, newInt);
					// console.log(`Next Date is: ${nextDate}`);

					newAtmp.ans = true;
					newAtmp.ans_sec = seconds;
					newAtmp.ease = ease;

					newAtmp.wstreak = newWstreak;
					newAtmp.lstreak = newLstreak;
					newAtmp.ef = newEF;
					newAtmp.interval = newInt;
					newAtmp.next_up = nextDate;

					console.log(`Updating DB Attempt ID: ${newAtmp._id}\nNew EF: ${newEF}\nWin Streak: ${newAtmp.wstreak}\nNext Up: ${newAtmp.next_up}\n`);
					docSave(newAtmp);

					i.update(
						{ content: `✅ Answer ${i.customId.toUpperCase()} is correct!.\nI'll ask you again on ${newAtmp.next_up}`, embeds: [], components: [agileContRow] },
					);
				} else {
					console.log(`⛔ Oh no! Incorrect!! ⌚ Time: ${seconds}`);
					const ease = easinessCalc(false, seconds);
					// console.log(`Ease calc: ${ease}`);
					// console.log(`lastEf: ${lastEf}`);
					const newEF = efCalc(lastEf, ease);
					console.log(`Old Lose Streak${lastLstreak}`);
					const newLstreak = lastLstreak + 1;
					console.log(`New Lose Streak${newLstreak}`);
					// console.log(`Old Winstreak${lastWstreak}`);
					const newWstreak = 0;
					// console.log(`New Winstreak${newWstreak}`);
					const newInt = 0;
					const nextDate = hoursToNext(startTime, 1);
					// console.log(`Next Date is: ${nextDate}`);

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
						{ content: `Sorry, ${i.customId.toUpperCase()} is not right. I'll ask you again later.`, embeds: [], components: [agileContRow] },
					);
				}
			})
			.catch(err => console.log(`Error: ${err}\n\n'No interactions were collected.'`));
	},
};