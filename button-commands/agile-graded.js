/*

	Button Command triggers when selecting skill name from initial graded command && when continuing to next questions

*/

const { EmbedBuilder, ComponentType } = require('discord.js');
const Question = require('../db/models/Question');
const SkillAssessment = require('../db/models/SkillAssessment');
const Student = require('../db/models/Student');
const { docSave } = require('../helpers/misc');
const { ansRow, agileGradedContRow } = require('../assets/action-rows');

const saName = 'agile';
const secPerQuestion = 90000;

module.exports = {
	customId: `${saName}-graded`,
	description: 'Moves to next question.',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const startTime = new Date();

		// Find Student in DB
		const student = await Student.findOne({
			disc_id: interaction.user.id,
		}).exec();
		const studentId = student._id;

		// Initialize question variables
		let SA = undefined;
		let nextQuestionNum = 0;
		let questionSet = [];
		let nextQuestion = questionSet[0];

		// Check for existing Question Set (In case of interaction fail & restart)
		await SkillAssessment.findOne()
			.where('student', studentId)
			.where('fin', false)
			.exec()

			.then(
				(doc) => {
					if (doc === null) {
						console.log('No Assessment In Progress...Starting New Assessment...');
						SA = new SkillAssessment();
						console.log('SA created');
					} else {
						SA = doc;
						console.log('SA in progress found');
						questionSet = SA.qSet.qs;
						nextQuestionNum = SA.qSet.answered;
					}
				},
				(err) => {
					console.log(err);
				},
			).catch(console.error);

		console.log(`SA: ${SA}`);

		console.log(`questionSet = ${questionSet}`);
		console.log(`nextQuestionNum = ${nextQuestionNum}`);

		if (questionSet.length === 0) {
			questionSet = await Question.aggregate([
				{ $match: { atmp_by: { $in: [studentId] } } },
				{ $match: { tags: 'agile' } },
				{ $sample: { size: 15 } },
			]);

			console.log(`${questionSet.length} questions found for questionSet.`);

			SA.student = student._id;
			SA.name = saName;
			SA.qSet.qs = questionSet;

			await docSave(SA).catch(console.error);
			console.log(`SA saved: ${SA}`);

			for (const x of questionSet) {
				x.sa.push(SA._id);
				console.log(`Q added: ${x.text}`);
			};
		}

		// Get next question in questionSet and display it.
		// next question is the next one to not have received an answer

		// nextQuestion is 15 or greater, all questions answered.
		if (nextQuestionNum >= 15) {
			console.log('All questions answered.');
			const correct = SA.qSet.correct.length;
			const missed = SA.qSet.missed.length;
			const percent = ((correct / 15) * 100).toFixed(0);
			let grade = undefined;
			if (missed <= 4) {
				grade = 100;
			} else {
				const adjusted = ((correct / 11) * 100).toFixed(0);
				if (adjusted < 50) {
					grade = 50;
				} else {
					grade = adjusted;
				}
			};

			SA.grade = grade;
			SA.fin = true;
			await docSave(SA);

			const finEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('🏁 Finished! 🏁')
				.addFields(
					{ name: 'Your Results', value: `Questions attempted: ${SA.qSet.qs.length}\n✅ Correct: ${correct}\n⛔ Missed: ${missed}\nPercent correct: ${percent}%` },
					{ name: 'Adjusted Grade', value: `${SA.grade}%` },
				);

			await interaction.editReply(
				{ ephemeral: true, embeds: [finEmbed], components: [] },
			).catch(console.error);

		} else {
			console.log(`Question #${nextQuestionNum} up next!`);
			nextQuestion = questionSet[nextQuestionNum];
			console.log(`Question Text found: ${nextQuestion.text}`);

			// Display question to student
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('Your Question')
				.addFields({ name: 'Question text', value: `${nextQuestion.text}` })
				.addFields(
					{ name: 'A', value: `${nextQuestion.choices.a}` },
					{ name: 'B', value: `${nextQuestion.choices.b}` },
					{ name: 'C', value: `${nextQuestion.choices.c}` },
					{ name: 'D', value: `${nextQuestion.choices.d}` },
				);

			const correctResponse = nextQuestion.ans;
			console.log(`Correct ans is: ${nextQuestion.ans.toUpperCase()}`);

			/* const lastAtmp = await Attempt
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
			}; */

			/* const newAtmp = await Attempt.findById(attemptId); */

			const buttonPressMsg = await interaction.editReply(
				{ content: ' ', ephemeral: true, embeds: [embed], components: [ansRow], fetchReply: true },
			).catch(console.error);


			buttonPressMsg.awaitMessageComponent({ componentType: ComponentType.Button, time: secPerQuestion, max: 1 })
				.then(i => {
					const endTime = new Date();
					console.log(`End time: ${endTime}`);
					const seconds = ((endTime - startTime) / 1000).toFixed(1);
					console.log(`Button pressed was: 〈⦿  ${i.customId.toUpperCase()} 〉`);

					if (i.customId === correctResponse) {
						console.log(`✅ Correct response logged! ⌚ Time: ${seconds}`);

						SA.qSet.correct.push(SA.qSet.qs[SA.qSet.answered]._id);
						SA.qSet.answered += 1;

						console.log(`Updating SA for ${student.disc_tag}:\nTotal answered: ${SA.qSet.answered}\n✅ Correct: ${SA.qSet.correct}\n⛔ Missed: ${SA.qSet.missed}\n`);
						docSave(SA);

						i.update(
							{ content: `Answer ${i.customId.toUpperCase()} logged.`, embeds: [], components: [agileGradedContRow] },
						);
					} else {
						console.log(`⛔ Incorrect response logged! ⌚ Time: ${seconds}`);

						SA.qSet.missed.push(SA.qSet.qs[SA.qSet.answered]._id);
						SA.qSet.answered += 1;

						console.log(`Updating SA for ${student.disc_tag}:\nTotal answered: ${SA.qSet.answered}\n✅ Correct: ${SA.qSet.correct}\n⛔ Missed: ${SA.qSet.missed}\n`);
						docSave(SA);

						i.update(
							{ content: `Answer ${i.customId.toUpperCase()} logged.`, embeds: [], components: [agileGradedContRow] },
						);
					}
				}, (reason => {
					const endTime = new Date();
					console.log(`End time: ${endTime}`);
					const seconds = ((endTime - startTime) / 1000).toFixed(1);

					console.log(`🚫⌛ No response collected! ⌚ Time: ${seconds}\nReason: ${reason}`);

					SA.qSet.missed.push(SA.qSet.qs[SA.qSet.answered]._id);
					SA.qSet.answered += 1;

					console.log(`Updating SA for ${student.disc_tag}:\nTotal answered: ${SA.qSet.answered}\n✅Correct: ${SA.qSet.correct}\n⛔Missed: ${SA.qSet.missed}\n`);
					docSave(SA);

					interaction.editReply(
						{ content: 'Time up!', embeds: [], components: [agileGradedContRow] },
					);
				}))
				.catch(err => {
					console.log(`Error: ${err}.`);
					interaction.editReply(
						{ content: `Error collecting response: ${err}.\n\nYour grade was not affected. If this continues, run /skill-assessment again to resume.`, embeds: [], components: [agileGradedContRow] },
					);
				});
		}
	},
};