const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const embed = new EmbedBuilder()
	.setTitle('Code Review')
	.setThumbnail('https://cdn-icons-png.flaticon.com/512/6404/6404558.png')
	.setImage('https://res.cloudinary.com/practicaldev/image/fetch/s--ika8MZkM--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uvxkt270iwrz8dlhx6x1.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code-review')
		.setDescription('Report your finished code review')

		.addUserOption(option =>
			option.setName('developer')
				.setDescription('Who wrote the code?')
				.setRequired(true))
		.addUserOption(option =>
			option.setName('reviewer')
				.setDescription('Who reviewed the code?')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('review-notes')
				.setDescription('Link to full review on Google Doc or GitHub, etc.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('biggest-win')
				.setDescription('What did you notice that was done really well?')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('biggest-opportunity')
				.setDescription('What is the biggest improvement that would require the least effort?')
				.setRequired(true)),

	async execute(interaction) {
		const developerOption = interaction.options.getUser('developer');
		const reviewerOption = interaction.options.getUser('reviewer');
		const link = interaction.options.getString('review-notes');
		const biggestWinOption = interaction.options.getString('biggest-win') ?? 'No positive feedback provided';
		const biggestOppOption = interaction.options.getString('biggest-opportunity') ?? 'No opportunistic feedback provided';

		if (interaction.channelId === '1007098501303377998') {
			embed.setColor('Purple');
			embed.setAuthor({ name: 'AP CSP' });
			// , iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org'
		}

		embed.setDescription(`Full review notes here: ${link}`);
		embed.setURL(interaction.options.getString('review-notes'));
		embed.addFields(
			{ name: 'Developer', value: `👨‍💻 ${developerOption}`, inline: true },
			{ name: 'Reviewer', value: `🔍 ${reviewerOption}`, inline: true },
			// { name: '\u200B', value: '\u200B' },
			{ name: 'Biggest Win', value: `${biggestWinOption}` },
			{ name: 'Biggest Opportunity', value: `${biggestOppOption}` },
		);

		await interaction.reply(
			{ ephemeral: false, embeds: [embed] },
		);
	},
};