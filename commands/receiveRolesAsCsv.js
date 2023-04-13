const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles-csv')
        .setDescription('Receive csv with role names and ids')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addAttachmentOption(file => file
            .setName('rolescsv')
            .setDescription('Add a .csv file with role names and ids')
            .setRequired(true)),
    async execute(interaction) {
        const stream = fs.createWriteStream('roles.csv');
        const { body } = await fetch(`${interaction.options.getAttachment('rolescsv').url}`);
        await finished(Readable.fromWeb(body).pipe(stream));
        interaction.reply(`File received successfully.`); 
    },
};
