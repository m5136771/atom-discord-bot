const { model, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const skillAssessmentSchema = new Schema({
	student: { type: ObjectId, ref: 'Student' },

	name: String,
	qSet: {
		qs: Array,
		answered: { type: Number, default: 0 },
		correct: [{ type: ObjectId, ref: 'Question' }],
		missed: [{ type: ObjectId, ref: 'Question' }],
	},
	fin: { type: Boolean, default: false },
	grade: Number,

	avg_ef: Number,
	med_ef: Number,
},
{
	timestamps: true,
});

module.exports = model('SkillAssessment', skillAssessmentSchema, 'assessments');