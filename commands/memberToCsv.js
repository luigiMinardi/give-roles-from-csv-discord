const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const ObjectsToCsv = require('objects-to-csv');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('members-csv')
    .setDescription('Generate a csv file with all members of the group (excluding bots) with the member tag and id.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
    async execute(interaction) {

        let members = []
        interaction.guild.members.cache.forEach((member) => {
            if(!member.user.bot) {
                members.push({
                    member: member.user.tag,
                    id: member.user.id,
                });
            } 
        });

        const csv = new ObjectsToCsv(members)
        await csv.toDisk("./members.csv")
            .then(async () => {
                await interaction.reply({ files: ["./members.csv"], content: `Here's a list of all server members excluding bots!`})
            })
            .catch(async (err) => {
                console.log("Error getting a list of Discord guild members.", err)
                await interaction.reply("Error getting the members of this server.")
            })
    },
};
