const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	id: { type: String, required: true, unique: true },
	name: { type: String, required: true }
})

const guildSchema = new Schema({
    id: { type: String, required: true },
	name: { type: String, required: true }
})

const preferenceSchema = new Schema({
	favColor: { type: String, required: true },
})

const characterSchema = new Schema({
    discord: {
		user: { type: [userSchema] },
		guild: { type: [guildSchema] }
	},
	character: {
		name: { type: String, required: true, max: 100 },
		faction: { type: String, required: true },
		charClass: { type: String, required: true},
		preferences: { type: [preferenceSchema] },
		level: { type: Number, required: true },
		hp: { type: Number, required: true },
		xp: { type: Number, required: true },
	}
});

module.exports = model('Character', characterSchema);