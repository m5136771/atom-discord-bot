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

const studentSchema = new Schema({
	_id: ObjectId,
	disc_id: { type: String, unique: true },
	disc_tag: { type: String, unique: true },

	fname: String,
	lname: String,
	email: String,
	year: Number,
	enrolled: [{ type: ObjectId, ref: 'Course' }],

	sa_tot_atmps: { type: Number, default: 0 },
	// sa_atmps: { type: [ObjectId], ref: 'Assessments' },

	qs_tot_atmps: { type: Number, default: 0 },
	qs_atmps: { type: [ObjectId], ref: 'Attempt' },

	next_up: { type: [ObjectId], ref: 'Attempt' },
});

module.exports = model('Student', studentSchema, 'students');