const { model, Schema } = require('mongoose');

const quizSchema = new Schema({

	name: String,
	abbrv: String,
	length: Number,
	linkedin: Boolean,

	questions: [{
		qNum: Number,
		text: String,
		qtype: String,
		choices: {
			a: String,
			b: String,
			c: String,
			d: String,
		},
		answer: String,

		tot_attempts: Number,
		avg_ef: Number,
		avg_sec: Number,
		med_sec: Number,
	}],

	avg_ef: Number,
	med_ef: Number,
});

module.exports = model('Quiz', quizSchema, 'quizzes');