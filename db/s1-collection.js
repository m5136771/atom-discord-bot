const mongoose = require('mongoose');
const { mongoUri } = require('../config.json');

// import Model
const Attempt = require('./models/Attempt');

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

// Create collection of Model
Attempt.createCollection();
console.log('Collection is created!');

// Close connection to DB
mongoose.disconnect();