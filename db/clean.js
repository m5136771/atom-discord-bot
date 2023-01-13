// DELETE IF...
// Question._id has atmp_by for Student._id,
// but no Attempt.next_up for that question & student

// Base imports
const mongoose = require('mongoose');
const { mongoUri } = require('../config.json');
const Attempt = require('./models/Attempt');

// import Model
const Question = require('./models/Question');
const Student = require('./models/Student');

async function run() {
	// Mongo Connect & Events
	mongoose
		.set('strictQuery', false)
		.connect(mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).then(
			() => { console.log('Connected to DB.'); },
			err => { console.log(err); },
		);

	const a = await Attempt
		.find()
		.where('next_up').exists(false);

	const s = a.student;

	const q = await Question
		.find()
		.where('atmp_by').in([`${studentId}`]);

	await Question.updateMany(
		{
			_id: nextQuestion._id,
		},
		{
			$pull: {
				'atmpt_by' : { _id: studentId },
			},
		},
	).then((res) => {
		console.log(res);
	}).catch(err => {
		console.log(err);
	});
};

run()
	.catch((err) => {
		console.error('Error completing script: ', err);
	});