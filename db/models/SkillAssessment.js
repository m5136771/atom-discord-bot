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

const skillAssessmentSchema = new Schema({
	student: { type: ObjectId, ref: 'Student' },

	name: String,
	qSet: {
		qs: Array,
		answered: { type: Number, default: 0 },
		correct: [{ type: ObjectId, ref: 'Question' }],
		missed: [{ type: ObjectId, ref: 'Question' }],
	},
	fin: { type: Boolean, default: false },
	grade: Number,

	avg_ef: Number,
	med_ef: Number,
},
{
	timestamps: true,
});

module.exports = model('SkillAssessment', skillAssessmentSchema, 'assessments');