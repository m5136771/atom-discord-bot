/* eslint-disable no-inline-comments */
/*

	Standalone script to create a Question and load questions into 'Questionzes' DB collection.

*/

// DECLARE Question
// ------------------------------
// ------------------------------
const fileName = '../question-banks/html.json';
// ------------------------------
// ------------------------------


// Base imports
const mongoose = require('mongoose');
const { mongoUri } = require('../config.json');

// import Model
const Question = require('./models/Question');

// import Question.json
const jsonFile = require(fileName);

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

	// Check for existing Question
	for (const x in jsonFile.questions) {
		const question = jsonFile.questions[x];
		const qsDoc = await Question.findOne({ text: question.text });
		if (!qsDoc) {
			console.log(`No DB entry found for ${question.text}`);

			// create new document instance
			const newQs = new Question(question);

			// save model to database
			newQs.save(function(err) {
				if (err) return console.error(err);
				console.log(`New Question (${newQs.text}) created and saved to 'questions' collection.`);
			});
		} else {
			console.log(`DB entry found for ${qsDoc.text}. Updating...`);
			const res = await Question.updateOne({ text: question.text }, question);
			console.log(`Question (${res}) updated successfully.`);
		};
	}
};

run()
	.catch((err) => {
		console.error('Error completing script: ', err);
	});