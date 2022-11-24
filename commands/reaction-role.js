const { ActionRowBuilder, Base, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildMember, GuildMemberManager, SlashCommandBuilder, Guild, GuildMemberRoleManager } = require('discord.js');

// BUILD RESPONSE
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reaction-role')
		.setDescription('Manage the server\'s reaction roles.')

		// Split command into specific subcommands
		// CREATE RR
		.addSubcommand(subcommand =>
			subcommand
				.setName('create')
				.setDescription('Set up a new role-emoji pair.')

				// Request required information to set up a reaction role
				.addStringOption(option =>
					option.setName('message-id')
						.setDescription('Right-click the target message and Copy ID (requires Developer Mode).')
						.setRequired(true))

				.addStringOption(option =>
					option.setName('emoji')
						.setDescription('Input the emoji you want to associate with a role.')
						.setRequired(true))
				
				.addRoleOption(option =>
					option.setName('role')
						.setDescription('Select the role to give anyone who reacts with the chosen emoji.')
						.setRequired(true))

				.addChannelOption(option =>
					option.setName('channel')
						.setDescription('Specify which channel the message is in, if not the current channel.')
						.setRequired(false))
		)

		// DELETE RR
		.addSubcommand(subcommand =>
			subcommand
				.setName('delete')
				.setDescription('Remove an existing role-emoji pair')
		),
	
	async execute(interaction) {	
		const theMember = interaction.member.nickname;
		console.log(`${theMember}`);

		const options = { member: interaction.member, role: interaction.options.getRole('role'), reason: 'because I said so.'};

		console.log(`Options are: ${options}, User is: ${options.member}, role is ${options.role}, reason is: ${options.reason}`);

		const messageId = interaction.options.getString('message-id');
		const emoji = interaction.options.getString('emoji');
		const channel = interaction.options.getChannel('channel') ?? 'No channel provided';
		
		
		// Send Response
		await interaction.reply(
			{
			content: 'success?'
			
			/* `\n
			User: ${user.id}, name is ${user.username}\n
			Message ID: ${messageId}\n
			emoji: ${emoji}\n
			role: ${role}\n
			channel: ${channel}` */,

			ephemeral: true,
			//embeds: [embed],
			//components: [row]
			},
			
		);
	},
};