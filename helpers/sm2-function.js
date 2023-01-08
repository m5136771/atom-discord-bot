// --------------------
// SM-2 ALGORITHM
// --------------------

const mongoose = require('mongoose');
const Quiz = require('../db/models/Quiz');
const Student = require('../db/models/Student');
const { easinessCalc, efCalc, daysToNext } = require('../helpers/helpers');

async function findStudent() {
	const student = Student.findOne({ id: interaction.member.id });
}

async function findQuestion () {
	const question = Quiz.findOne({ _id: interaction.question.id });
}

async function checkResponse () {
	const lastResponse = {
		correct: interaction.question.isCorrect(),
		ans_sec: Quiz.questions[x].ans_sec,
	};
}

async function sm2(question, student, lastResponse) {
	// 1. Split the knowledge into smallest possible items.
	question = q_id;

	// 2. With all items associate an E-Factor equal to 2.5.
	// --Student.qresults[quizName].questions[q_id].ef default: 2.5

	// 3. Repeat items using the following intervals:
	const interval = daysToNext(question.wstreak, ef);
	// update Student.qresults[quizName].questions[q_id].interval
	// update Student.qresults[quizName].questions[q_id].next_up

	// 4. After each repetition assess the quality (easiness) of repetition response in 0-5 grade scale
	const easiness = easinessCalc(response.correct, response.time);
	// update Student.qresults[quizName].questions[q_id].attempts[mostRecent].easiness

	// 5. After each repetition modify the E-Factor of the recently repeated item according to the formula:
	const ef = efCalc(question.ef, easiness);
	// update Student.qresults[quizName].questions[q_id].ef

	// 6. If the quality response was lower than 3 then start repetitions for the item from the beginning without changing the E-Factor (i.e. use intervals I(1), I(2) etc. as if the item was memorized anew).
	// --handled by winstreak. if (wstreak === 0) {daysToNext = 0}

	// 7. After each repetition session of a given day repeat again all items that scored below four in the quality assessment. Continue the repetitions until all of these items score at least four.
	// --Allow student to initiate quiz at any time (doable as ungraded homework) in-class quizzes graded, but not out-of class self-init quizzes

	// UPDATE DB STUDENT FILES
	// --Student.qresults.taken (Timestamp from quiz-end button command)
	// --Student.qresults.questions.
	// --q.interval

}

module.exports = { sm2 };