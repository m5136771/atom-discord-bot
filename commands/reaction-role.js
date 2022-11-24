const { SlashCommandBuilder } = require('discord.js');

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
						.setRequired(false)),
		)

		// DELETE RR
		.addSubcommand(subcommand =>
			subcommand
				.setName('delete')
				.setDescription('Remove an existing role-emoji pair'),
		),


	async execute(interaction) {
		const member = interaction.member;
		const messageId = interaction.options.getString('message-id');
		const emoji = interaction.options.getString('emoji');
		const role = interaction.options.getRole('role');
		const channel = interaction.options.getChannel('channel') ?? 'No channel provided';
		const reason = 'because I said so.';

		console.log(`
			Guild Member: ${member}\n
			Message ID: ${messageId}\n
			Emoji: ${emoji}\n
			Role: ${role}\n
			Channel: ${channel}
			Reason: ${reason}
		`);


		// Send Response
		await interaction.reply(
			{ content:`
				Guild Member: ${member}\n
				Message ID: ${messageId}\n
				Emoji: ${emoji}\n
				Role: ${role}\n
				Channel: ${channel}
				Reason: ${reason}`,

			ephemeral: true,
			},
		);
	},
};