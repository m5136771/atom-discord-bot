/* eslint-disable no-inline-comments */
/*

	Standalone script to create a quiz and load questions into 'quizzes' DB collection.

*/

// DECLARE QUIZ
// ------------------------------
// ------------------------------
const quizFile = '../quizzes/html.json';
// ------------------------------
// ------------------------------


// Base imports
const mongoose = require('mongoose');
const { mongoUri } = require('../config.json');

// import Model
const Quiz = require('./models/Quiz');

// import quiz.json
const quizJson = require(quizFile);


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

	// Check for existing quiz
	const foundQuiz = await Quiz.findOne({ name: quizJson.name });
	if (!foundQuiz) {
		console.log(`No DB entry found for ${quizJson.name}`);

		// create new document instance
		const newQuiz = new Quiz(quizJson);

		// save model to database
		newQuiz.save(function(err) {
			if (err) return console.error(err);
			console.log(`New quiz, ${newQuiz.name}, created and saved to 'quizzes' collection.`);
			mongoose.connection.close();
		});
	} else {
		console.log(`DB entry found for ${foundQuiz.name}. Updating...`);
		await Quiz.updateOne({ name: quizJson.name }, quizJson);
		console.log(`Quiz ${foundQuiz.name} updated successfully.`);

		mongoose.connection.close();
	};
};

run()
	.catch((err) => {
		console.error('Error completing script: ', err);
	});