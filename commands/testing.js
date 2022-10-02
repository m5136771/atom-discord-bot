const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testing')
		.setDescription('for testing'),

	async execute(interaction) {
		await interaction.reply(
			`Testing:
			\nClient Logged in as User ('@A.T.O.M.'): ${interaction.client.user}`,
		);
	},
};


/*

'SNOWFLAKES'
Read more at: https://developer.twitter.com/en/docs/twitter-ids
Twitter IDs are unique 64-bit unsigned integers.
The full ID is composed of a timestamp, a worker number, and a sequence number.
In JavaScript, integers are limited to 53-bits in size.

If you run the command...
    (10765432100123456789).toString()
the result will be
    "10765432100123458000" (last 4 are different)

The 64-bit integer loses accuracy as a result of the translation.
(this is sometimes called “munging” - a destructive change to a piece of data).

*/


// USABLE COMMANDS
// *---Application---*
// ApplicationId (?Snowflake '1007449204806922350'): ${interaction.applicationId}

// *---Channels---*
// Channel ('#channel-name'): ${interaction.channel}
// Channel ID (Snowflake): ${interaction.channelId}

// *---Client---*
// Client ('[object Object]'): ${interaction.client}
// Client Ready At ('Sat Oct 01 2022 22:34:45 GMT-0400 (Eastern Daylight Time)'): ${interaction.client.readyAt}

// *---Guild---*
// Guild ('TSS Tech'): ${interaction.guild}
// Guild Acronym (string: 'TT'): ${interaction.guild.nameAcronym}
// Guild AFK Channel ('null'): ${interaction.guild.afkChannel}
// Guild Id ('1001005535245647872'): ${interaction.guildId}
// Guild Id Alternative (?Snowflake: '1001005535245647872'): ${interaction.guild.id}
// Guild is Large? (boolean: 'false'): ${interaction.guild.large}
// Guild Locale ('en-US'): ${interaction.guildLocale}
// Guild Member Count ('25'): ${interaction.guild.memberCount}
// Guild Max Members (number: '500000'): ${interaction.guild.maximumMembers}`,
// Guild Name ('TSS Tech'): ${interaction.guild.name}
// Guild Owner Id (?Snowflake: '804824020251705344'): ${interaction.guild.ownerId}
// Guild Rules Channel (?TextChannel: 'server-rules'): ${interaction.guild.rulesChannel}
// Guild Rules Channel Id (?Snowflake: '1008873804895883367'): ${interaction.guild.rulesChannelId}

// *---Interaction---*
// Interaction Id ('1025950230505590784'): ${interaction.id}
// Created At ('Sat Oct 01 2022 21:59:56 GMT-0400 (Eastern Daylight Time)'): ${interaction.createdAt}
// Created Timestamp ('1664675996186'): ${interaction.createdTimestamp}
// Locale ('en-US'): ${interaction.locale}
// Interaction Token ('aW50ZXJhY3Rpb246MTAyNTk1MDIzMDUwNTU5MDc4NDpKWlpxOVloOVRMd1lQRHJudXB6WnZPWDV0MTRJZFZJejFTT2lBTmZ3ZWNNQm0xMEg0Vmg3M3Zjb2VFYm1WTWVrTTdMZDNGYmtVMk4wbU1BVGtTZE4wOTJqRk5mOExmTE9MSkF3cUtrcmp0RmdYdzZ2cWJROHUwdXUxSXl2S2J4Qg'): ${interaction.token}
// Interaction Type ('2'): ${interaction.type}
// Version ('1'): ${interaction.version}

// *---User/Member---*
// Member ('@Mr. DiPaolo'): ${interaction.member}
// Member Permissions ('[object Object]'): ${interaction.memberPermissions}
// User ('@Mr. DiPaolo'): ${interaction.user}

// DON'T WORK THIS WAY
// Channel Deleteable? (''): ${interaction.TextChannel.deletable}
// Channel Last Message? (''): ${interaction.TextChannel.lastMessage}
// Guild Approx. Member Count ('null'): ${interaction.guild.approximateMemberCount}
