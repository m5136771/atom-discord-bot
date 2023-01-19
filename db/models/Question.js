const { model, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const questionSchema = new Schema({
	qNum: { type: String, unique: true },
	sa: [{ type: ObjectId, ref: 'Skill Assessment' }],

	directions: String,
	img: String,
	text: String,
	choices: {
		a: String,
		b: String,
		c: String,
		d: String,
	},
	ans: String,
	tags: Array,
	source: String,
	sec: String,

	tot_atmp: { type: Number, default: 0 },
	atmp_by: [{ type: ObjectId, ref: 'Student' }],
	avg_ef: Number,
	avg_sec: Number,
	med_sec: Number,
});

module.exports = model('Question', questionSchema, 'questions');