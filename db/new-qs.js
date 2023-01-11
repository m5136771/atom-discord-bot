const mongoose = require('mongoose');
const { mongoUri } = require('../config.json');

// import Model
const Question = require('./models/Question');
const Quiz = require('./models/SkillAssessment');

// ---------------------
// ---------------------
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

mongoose
	.connection.on('connecting', err => {
		console.log(err);
	  });

mongoose
	.connection.on('error', err => {
		console.log(err);
	  });

mongoose
	  .connection.on('disconnected', err => {
		console.log(err);
	  });
// ---------------------
// ---------------------

// Create collection of Model
/* Question.createCollection();
console.log('Collection is created!'); */


async function run() {
	console.log('Running...');

	const quiz = await Quiz.findOne({
		abbrv: 'html',
	});
	console.log(quiz);

	// Question Info:
	const qs = new Question({
		qs_type: 'Multiple Choice',
		for_qz: quiz._id,

		text: 'Would you eat green eggs and ham?',
		choices: {
			a: 'on a boat?',
			b: 'with a goat?',
			d: 'I would not, could not.',
		},
		ans: 'd',
	});

	console.log(qs.text);

	// Check for existing question
	const query = { text: qs.text };
	const res = await Question.updateOne(query, qs, { upsert: true });
    console.log(res.matchedCount); // Number of documents matched
    console.log(res.modifiedCount); // Number of documents modified
    console.log(res.acknowledged); // Boolean indicating everything went smoothly.
    console.log(res.upsertedId); // null or an id containing a document that had to be upserted.
    console.log(res.upsertedCount); // Number indicating how many documents had to be upserted. Will either be 0 or 1.

	// Close connection to DB
	// console.log('Disconnecting...');
	// mongoose.disconnect();
};

run()
	.catch((err) => {
		console.error('Error completing script: ', err);
	});