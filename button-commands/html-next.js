/* A.T.O.M. - A modern tool for high school education
 * Copyright (C) 2023  Michael A. DiPaolo
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/*

	Button Cmd triggers onClick after /practice -> 'HTML'

*/

const { EmbedBuilder, ComponentType } = require('discord.js');
const Attempt = require('../db/models/Attempt');
const Question = require('../db/models/Question');
const Student = require('../db/models/Student');
const { getRandomInt, easinessCalc, efCalc, daysToNext, newDate, docSave, hoursToNext, docDelete } = require('../helpers/misc');
const { ansRow, htmlContRow } = require('../assets/action-rows');

const saName = 'html';
const secPerQuestion = 600000;

module.exports = {
	customId: `${saName}-next`,
	description: 'Moves to next question.',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const startTime = new Date();
		const startTimeISO = startTime.toISOString();

		// Find Student in DB
		const student = await Student.findOne({
			disc_id: interaction.user.id,
		}).exec();
		console.log(`Student: ${student.disc_tag}. ID: ${student._id} - Beginning Practice`);
		const studentId = student._id;

		let nextQuestion = undefined;

		const nextUp = await Attempt
			.findOneAndUpdate({ r_atmp: true })
			.where('next_up').lte(startTimeISO)
			.where('student', studentId)
			.where('tags').in([`${saName}`])
			.where('r_atmp', false)
			.sort({ next_up: 1 })

			.then(
				(doc) => {
					if (doc === null) {
						// console.log('Next Up Queue Empty...');
					} else {
						nextQuestion = doc.qs._id;
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
			nextQuestion = questionDue;
		}

		// IF !nextQuestion from next_up, pull random from DB
		if (!nextQuestion) {
			const queryForCount = await Question
				.countDocuments()
				.where('tags').in([`${saName}`])
				.where('atmp_by').ne(studentId);

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
				console.log(`Student: ${student.disc_tag}: No more quiz questions.. ending quiz.`);
				return;
			}

			const ranNum = getRandomInt(0, queryForCount - 1);

			const questionDocs = await Question
				.findOne()
				.where('tags').in([`${saName}`])
				.where('atmp_by').ne(studentId)
				.skip(ranNum);

			nextQuestion = questionDocs;

			// Log Question in Student doc as Attempted
			questionDocs.tot_atmp += 1;
			const index = questionDocs.atmp_by.indexOf(studentId);
			if (index === -1) {
				questionDocs.atmp_by.push(studentId);
				console.log(`Student ${studentId} added to atmp_by`);
			} else {
				console.log('Student already in atmp_by');
			}
			docSave(questionDocs);
		} else {
			// console.log(`Question ${nextQuestion} is ready; moving forward`);
		};

		const questionId = nextQuestion._id;
		const imgString = nextQuestion.img;
		const directionText = nextQuestion.directions;

		// Create new Attempt Doc in DB
		const atmp = new Attempt({
			student: student._id,
			graded: false,
			qs: questionId,
		});

		const attemptId = atmp._id;

		docSave(atmp);

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

		if (directionText) {
			embed.setDescription(`${nextQuestion.directions}`);
		}

		if (imgString) {
			embed.setImage(`${imgString}`);
		}

		const correctResponse = nextQuestion.ans;

		const lastAtmp = await Attempt
			.findOne()
			.where('qs', questionId)
			.where('student', studentId)
			.sort({ createdAt: -1 });

		let lastWstreak = 0;
		let lastLstreak = 0;
		let lastEf = 2.5;
		if (!lastAtmp) {
			// console.log(`lastAtmp: ${lastAtmp}`);
		} else {
			lastWstreak = lastAtmp.wstreak;
			lastLstreak = lastAtmp.lstreak;
			lastEf = lastAtmp.ef;

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
				const seconds = ((endTime - startTime) / 1000).toFixed(1);

				if (i.customId === correctResponse) {
					console.log(`Student: ${student.disc_tag}: ✅ Correct ⌚ Time: ${seconds}`);
					const ease = easinessCalc(true, seconds);
					const newEF = efCalc(lastEf, ease);
					const newLstreak = 0;
					const newWstreak = lastWstreak + 1;
					const newInt = daysToNext(newWstreak, newEF);
					const nextDate = newDate(startTime, newInt);

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
						{ content: `✅ Answer ${i.customId.toUpperCase()} is correct!.\nI'll ask you again on ${newAtmp.next_up}`, embeds: [embed], components: [htmlContRow] },
					);
				} else {
					console.log(`Student: ${student.disc_tag}: ⛔ Incorrect ⌚ Time: ${seconds}`);
					const ease = easinessCalc(false, seconds);
					const newEF = efCalc(lastEf, ease);
					const newLstreak = lastLstreak + 1;
					const newWstreak = 0;
					const newInt = 0;
					const nextDate = hoursToNext(startTime, 1);

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
						{ content: `Sorry, ${i.customId.toUpperCase()} is not right. I'll ask you again later.`, embeds: [embed], components: [htmlContRow] },
					);
				}
			}, (reason => {
				console.log(`🚫⌛ No response collected!\nReason: ${reason}\n`);
				console.log(`Deleting attempt: ${attemptId}.`);
				docDelete(Attempt, attemptId);

				interaction.editReply(
					{ content: 'Timed out... you really took your time with this one! Attempt cleared from database; this won\'t affect your stats.', embeds: [], components: [htmlContRow] },
				);
			}))
			.catch(err => {
				console.log(`🚫⌛ No response collected!\nError: ${err}.`);
				console.log(`Deleting attempt: ${attemptId}.`);
				docDelete(Attempt, attemptId);

				interaction.editReply(
					{ content: `Error collecting response: ${err}.\n\nYour grade was not affected. If this continues, run /skill-assessment again to resume.`, embeds: [], components: [htmlContRow] },
				);
			});
	},
};