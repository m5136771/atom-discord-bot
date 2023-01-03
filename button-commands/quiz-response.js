/*

	Button Command triggers when student answers quiz question

*/

const { sm2 } = require('../quizzes/sm2');

// when question is answered..
// -- add one to attempts
// -- log time in secs
// -- determine correct/incorrect
// -- map to easiness score

// IF correct...
// -- add one to streak

// -- IF ef > 3
// -- -- IF streak = 0


// -- move to next interval (iLvl) based on 'easiness' (ans_sec)
// -- adjust ef

// if incorrect..
// -- reset iLvl
// -- adjust ef


// 'cleanup'
// -- calculate new average ans_sec for each question from previous attempts
// -- calculate new median ans_sec for each question from previous attempts

// -- calc quizwide avg ef
// -- calc quizwide median ef

module.exports = {
	customId: 'quiz-response',
	description: 'Triggers on quiz question answer button click',

	async execute(interaction) {
		await interaction.update(
			{ content: '', ephemeral: true, embeds: [embed], components: [row] },
		);
	},
};