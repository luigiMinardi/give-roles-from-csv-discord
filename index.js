require("dotenv").config()

const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// Commands configuration
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const filePath = path.join(commandsPath,file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if('data' in command && 'execute' in command){
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	};
};

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.on(Events.ClientReady, async c => {
	
	await c.guilds.fetch().then( async (guilds) => {
		for (const guild of guilds) {
		await c.guilds.cache.get(guild[0]).members.fetch().then(console.log('members fetched')).catch(console.error)
		} 
	}).catch(console.error)
	console.log(`Ready! Logged in as ${c.user.tag}`);

});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).catch(err => console.log("Invalid token"))

// Listeners
client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if(!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (err) {
		console.error(err);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
		}
	}
});

