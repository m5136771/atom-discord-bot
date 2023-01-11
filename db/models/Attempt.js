const { model, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const atmpSchema = new Schema({

	student: { type: ObjectId, ref: 'Student' },
	sa: { type: ObjectId, ref: 'SkillAssessment' },
	graded: { type: Boolean, default: false },
	qs: { type: ObjectId, ref: 'Question' },

	ans: Boolean,
	ans_sec: { type: Number, max: 90 },
	ease:  Number,

	wstreak: { type: Number, default: 0 },
	lstreak: { type: Number, default: 0 },
	ef: { type: Number, default: 2.5 },
	interval: { type: Number, default: 0 },
	next_up: Date,
	r_atmp: { type: Boolean, default: false },
},
{
	timestamps: true,
});

module.exports = model('Attempt', atmpSchema, 'attempts');