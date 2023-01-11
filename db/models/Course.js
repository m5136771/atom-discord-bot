const { model, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const courseSchema = new Schema({
	_id: ObjectId,

	block: Number,
	name: String,
	abbrv: String,
	role: String,
});

module.exports = model('Course', courseSchema, 'courses');