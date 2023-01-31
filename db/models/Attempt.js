/* A.T.O.M. - A modern tool for high school education
 * Copyright (C) 2023  Michael A. DiPaolo
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const { model, Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const atmpSchema = new Schema({

	student: { type: ObjectId, ref: 'Student' },
	sa: { type: ObjectId, ref: 'SkillAssessment' },
	graded: { type: Boolean, default: false },
	qs: { type: ObjectId, ref: 'Question' },

	ans: { type: Boolean, default: false },
	ans_sec: Number,
	ease:  Number,

	wstreak: { type: Number, default: 0 },
	lstreak: { type: Number, default: 0 },
	ef: { type: Number, default: 2.5 },
	interval: { type: Number, default: 0 },
	next_up: Date,
	r_atmp: { type: Boolean, default: false },
},
{
	timestamps: true,
});

module.exports = model('Attempt', atmpSchema, 'attempts');