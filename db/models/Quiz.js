const { model, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const quizSchema = new Schema({

	name: String,
	abbrv: String,
	length: Number,
	linkedin: Boolean,

	questions: [{
		ques_id: ObjectId,
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
		tot_reps: Number,
		avg_sec: Number,
		med_sec: Number,
		mass_ef: { type: Number, default: 2.5 },
	},
	],

	avg_ef: Number,
	med_ef: Number,
});

module.exports = model('Quiz', quizSchema, 'quizzes');