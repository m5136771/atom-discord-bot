/* eslint-disable no-inline-comments */
const config = require('../config.json');

// --------------------
// COMMAND HELPER FUNCTIONS
// --------------------

// Check if Role is a TSS-Class?
function getClassInfo(roleId) {
	let classObj = null;

	switch (roleId) {
	case '1014391186510856202':
		classObj = config.classInfo.b2;
		break;
	case '1014391620323528704':
		classObj = config.classInfo.b3;
		break;
	case '1014391439309938718':
		classObj = config.classInfo.b4;
		break;
	case '1014391323027062794':
		classObj = config.classInfo.b6;
		break;

	default:
		console.log(`Selected Role (${roleId}) is not a class!`);
		break;
	}

	return classObj;
};

async function getMembersWithRole(i, role) {
	// get Disc_ids for everyone with class role
	const membColl = await i.guild.members.fetch(); // get all members in guild
	const discIds = []; // empty array to hold member ids

	membColl
		.filter(member => member.roles.cache.has(role.id)) // filter out all members that don't match the specified role
		.each(member => discIds.push(member.id)); // for each one remaining, add to the prepared array
	console.log(`Collection of member ids: ${discIds.toString()}`); // make sure it worked

	if (discIds.length === 0) {
		await i.reply({
			content: 'No members found with this class role.',
			ephemeral: true,
		});
		return discIds;
	};
};


// --------------------
// SPACED REPETITION HELPER FUNCTIONS
// --------------------

function easinessCalc(ansCorrect, ansTime) {
	if (!ansCorrect) {
		if (ansTime >= 29 && ansTime <= 90) {
			// incorrect; answered slow (tried, meaning closer to recallable)
			return 2;
		} else if (ansTime >= 0 && ansTime <= 10) {
			// incorrect; answered fast (guessed or careless)
			return 1;
		} else {
			// too long, trying to look up answer. 60-90s
			return 0;
		};
	} else {
		if (ansTime >= 0 && ansTime <= 9) {
			return 5;
		} else if (ansTime >= 20 && ansTime <= 39) {
			return 4;
		} else {
			// longer than 39s, had to look up answer.
			return 3;
		};
	};
};

function efCalc(ef, easiness) {
	if (ef === null) {
		ef = 2.5;
	};

	// let efNew = ef + (0.1 - (5 - easiness) * (0.08 + (5 - easiness) * 0.02));
	let efNew = ef - 0.8 + 0.28 * easiness - 0.02 * easiness * easiness;
	const efDiff = efNew - ef;

	console.log(`New EF calculates to ${efNew.toFixed(2)}, a difference of ${efDiff.toFixed(2)}`);

	if (efNew < 1.3) {
		console.log('EF has fallen below 1.3; Needs review.');
		return efNew = 1.3;
	};

	console.log('Calculation finished.');
	return efNew.toFixed(2);
};

/*
1.1-1.29: flag for review; question may need reformulation
1.3: most difficult to recall
2.5: easiest to recall
 */

// Note, that for q=4 the E-Factor does not change.

function hoursToNext(time, hours) {
	const t = time.setHours(time.getMinutes() + hours);
	console.log(`Adding ${hours} to ${time}: ${t}`);
	return t;
};

function daysToNext(wstreak, ef) {
	let days = 0;
	if (wstreak === 0) {
		console.log(`Given a win streak of ${wstreak} and an ef of ${ef}\nInterval calculates to ${days} days.`);
		return days;
	} else if (wstreak === 1) {
		days = 1;
		console.log(`Given a win streak of ${wstreak} and an ef of ${ef}\nInterval calculates to ${days} days.`);
	} else {
		// If interval is a fraction, round it up to the nearest integer.
		days = Math.ceil(wstreak * ef);
		console.log(`Given a win streak of ${wstreak} and an ef of ${ef}\nInterval calculates to ${days} days.`);
	};

	return days;
};

function newDate(today, interval) {
	const d = today.setDate(today.getDate() + interval);
	return d;
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

async function docSave(doc) {
	await doc.save().catch(console.error);
};

module.exports = {
	daysToNext,
	docSave,
	easinessCalc,
	efCalc,
	getClassInfo,
	getMembersWithRole,
	getRandomInt,
	hoursToNext,
	newDate,
};