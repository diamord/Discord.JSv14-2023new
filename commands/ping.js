const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('回你個Pong!'),
    async execute (interaction) {
        await interaction.reply({ content: 'ephemeral message', ephemeral: true })
    }
}