const { model, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const studentSchema = new Schema({
	_id: ObjectId,
	disc_id: { type: String, unique: true },
	disc_tag: { type: String, unique: true },

	fname: String,
	lname: String,
	email: String,
	year: Number,
	enrolled: [{ type: ObjectId, ref: 'Course' }],

	sa_tot_atmps: { type: Number, default: 0 },
	// sa_atmps: { type: [ObjectId], ref: 'Assessments' },

	qs_tot_atmps: { type: Number, default: 0 },
	qs_atmps: { type: [ObjectId], ref: 'Attempt' },

	next_up: { type: [ObjectId], ref: 'Attempt' },
});

module.exports = model('Student', studentSchema, 'students');