const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const csv = require('csvtojson');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('give-csv-roles')
    .setDescription('Give roles to members based on csv data.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
    async execute(interaction) {
        let roles = await csv().fromFile('roles.csv').then((jsonObj)=>jsonObj);
        let kickstart = await csv().fromFile('kickstart.csv').then((jsonObj)=>jsonObj);
        let members = await csv().fromFile('members.csv').then((jsonObj)=>jsonObj);

        let log = fs.createWriteStream('roles-given.log.txt')

        kickstart.forEach(entry => {
            members.forEach(user => {
                if (user.member == entry.tag) {
                    const role = roles.find(role => role.name == entry.role);
                    const newRole = interaction.guild.roles.cache.get(`${role.id}`);
                    const userToUpdate = interaction.guild.members.cache.get(`${user.id}`);

                    userToUpdate.roles.add(newRole); 
                    log.write(`${user.member} [Id ${user.id}]: ADD_ROLE= ${role.name} [Id ${role.id}] => ${userToUpdate.roles.cache.some(rol => rol.id == role.id)}\n`)
                }
            });
        });

        log.end()

        interaction.reply(`Roles given successfully.`); 
    },
};
