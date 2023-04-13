const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kickstarter-data')
        .setDescription('Receive csv with discord tags and the respective role')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addAttachmentOption(file => file
            .setName('kscsv')
            .setDescription('Add a .csv file with discord tags and role names')
            .setRequired(true)),
    async execute(interaction) {
        const stream = fs.createWriteStream('kickstart.csv');
        const { body } = await fetch(`${interaction.options.getAttachment('kscsv').url}`);
        await finished(Readable.fromWeb(body).pipe(stream));
        interaction.reply(`File received successfully.`); 
    },
};
