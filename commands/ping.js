const {SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('pong bro'),
	async execute(interaction) {
		await interaction.reply('pong');
	},
};
