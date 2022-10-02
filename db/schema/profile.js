const { model, Schema } = require('mongoose');

const profileSchema = new Schema(
	{
		discordId: { type: String, required: true, unique: true },
		discordName: { type: String, required: true },
		guild: { type: String, required: true },
		guildId: { type: String, required: true },
		characterName: { type: String, required: true },
		faction: { type: String, required: true },
		fcolor: { type: String, required: true },
		cclass: { type: String, required: true },
	},
);

module.exports = model('Profile', profileSchema, 'profiles');