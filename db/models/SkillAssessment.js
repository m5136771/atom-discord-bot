const { model, Schema } = require('mongoose');
const { questionSchema } = require('./Question');
const ObjectId = Schema.Types.ObjectId;

const skillAssessmentSchema = new Schema({
	_id: ObjectId,

	name: String,
	abbrv: String,
	linkedin: Boolean,
	qBank: Number,

	qSet: {
		type: [questionSchema],
		validate: {
			validator: function(value) {
				return value.length === 15;
			},
			message: 'Assessment should have 15 questions.',
		},
	},

	avg_ef: Number,
	med_ef: Number,
});

module.exports = model('SkillAssessment', skillAssessmentSchema, 'assessments');