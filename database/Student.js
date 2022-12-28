const { model, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const studentSchema = new Schema({
	_id: ObjectId,
	disc_id: { type: String, unique: true },
	disc_tag: { type: String, unique: true },

	name: String,
	year: Number,
	classes: [
		{
			block: Number,
			name: String,
			abbrv: String,
			role: String,
			audit: Boolean,
		},
	],

	qresults: [{
		_id: { type: ObjectId, ref: 'Quiz' },
		taken: Date,
		questions: [{
			ques_id: { type: ObjectId, ref: 'Quiz' },
			attempts: [{
				attempt_id: ObjectId,
				result: Boolean,
				seconds: { type: Number, max: 90 },
				date: Date,
			}],
			tot_attempts: Number,
			rep_num: Number,
			ef: { type: Number, default: 2.5 },
			ilevel: Number,
			next_up: Date,
		}],
	}],
});

module.exports = model('Student', studentSchema, 'students');