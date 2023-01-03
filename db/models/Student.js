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
		quiz_id: { type: ObjectId, ref: 'Quiz' },
		taken: Date,
		questions: [{
			question_id: { type: ObjectId, ref: 'Quiz' },
			attempts: [{
				_id: ObjectId,
				date: Date,

				ans: Boolean,
				ans_sec: { type: Number, max: 90 },
				easiness:  Number,
			}],
			tot_attempts: Number,
			avg_sec: Number,
			med_sec: Number,

			wstreak: { type: Number, default: 0 },
			lstreak: { type: Number, default: 0 },

			ef: { type: Number, default: 2.5 },
			interval: { type: Number, default: 0 },
			next_up: Date,
		}],
	}],
});

module.exports = model('Student', studentSchema, 'students');