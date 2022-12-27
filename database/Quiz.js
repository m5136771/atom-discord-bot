const { mongoose, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Quiz',  new Schema({
	_id: ObjectId,

	name: String,
	length: Number,
	
	questions: [{
		ques_id: ObjectId,
		descr: String,
		answer: String,
		
		tot_attempts: Number,
		tot_reps: Number,
		avg_sec: Number,
		med_sec: Number,
		mass_ef: { type: Number, default: 2.5 },
	}],

	avg_ef: Number,
	med_ef: Number,
}));