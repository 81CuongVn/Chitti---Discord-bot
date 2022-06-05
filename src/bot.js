require('dotenv').config();

const fs = require('fs')
const Discord = require('discord.js')
const Builder = require('@discordjs/builders')
const wait = require('node:timers/promises').setTimeout;
const client  = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES' , 'GUILD_PRESENCES', 'DIRECT_MESSAGES' , 'GUILD_VOICE_STATES']});
client.commands = new Discord.Collection();

const currYear = 2021
const Prefix = '$'

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`);
    client.user.setStatus("online");
});

// to read all the command files present in the folder
fs.readdir("./src/commands/", (err, files) => {
    if(err) console.log(err);
    let jsFile = files.filter(f => f.split(".").pop() == "js");
    if(jsFile.length<=0){
        console.log("There is no command to load!!");
        return;
    }
    console.log(`.....Loading ${jsFile.length} commands!`);

    jsFile.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} command loaded!`);
        client.commands.set(props.help.name, props);

        // for Autocomplete
        const commandData = new Builder.SlashCommandBuilder()
            .setName('autocomplete')
            .setDescription('Test command to show how autocomplete should be set up')
            .addStringOption(option =>
		         option
                .setName(f.split('.')[0])
                .setDescription('Name of something')
                .setAutocomplete(true));

    });
})


// Read image commands
fs.readdir("./src/commands/image-commands/", (err, files) => {
    if(err) console.log(err);
    let jsFile = files.filter(f => f.split(".").pop() == "js");
    console.log(`.....Loading ${jsFile.length} image commands!`);
    
    jsFile.forEach((f,i) => {
        let props = require(`./commands/image-commands/${f}`)
        console.log(`${f} command loaded!`);
        client.commands.set(props.help.name, props);
    })
})


// whenever any message is created in the server
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(Prefix)) return;

    console.log(`[${message.author.tag}]: ${message.content}`);

    let [CMD_NAME, ...args] = message.content.trim().substring(1).split(/\s+/);
    CMD_NAME = CMD_NAME.toLowerCase();

    let commandFile = client.commands.get(CMD_NAME);
    if(commandFile) commandFile.run(client, message, args);

});

// whenever any interaction is created
client.on('interactionCreate', async interaction => {

    // When there is a menu selection interaction
    if(interaction.customId === 'YrOfBirth') {
        if(interaction.replied) return interaction.reply(`Heyy, ${interaction.member.displayName}, you can reply only once :)`)
        var year = currYear - parseInt(interaction.values[0])
        interaction.reply(`Woahh! ${interaction.member.displayName}, you are ${year} years old!`);
    }

    // When there is a autocomple interaction
    if (interaction.commandName === 'autocomplete') {
		const focusedValue = interaction.options.getFocused();
		const choices = ['faq', 'install', 'collection', 'promise', 'debug'];
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		const response = await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	}

    //When image_help button is clicked
    if(interaction.customId === 'help_image_commands') {
        client.commands.get('help').run_image(client, interaction);
    }
});

// whenever a message is deleted
client.on('messageDelete',  (message) => {
    message.channel.send(`Haha! Caught you ${message.author} :full_moon_with_face: \nWhy delted the msg: \"${message.content}\"`)
});


// whenever a new channel is created
client.on('channelCreate', channel => {
    channelType = "unknown";
    if(channel.type==='GUILD_TEXT')
        channelType = "Text Channel"
    else if(channel.type==='GUILD_VOICE')
        channelType = "Voice Channel"
    const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Channel status ***")
                .addField(" \u200B ", "**This channel belongs to ** : ` " + `${channel.guild}` + " `")
                .addField(" \u200B ", "**Created At** : ` " + `${channel.createdAt}` + " `")
                .addField(" \u200B ", "**Parent** : ` " + `${channel.parent.name}` + " `")
                .addField(" \u200B ", "**Type** : ` " + `${channelType}` + " `")
                .addField(" \u200B ", "**Members** : ` " + `${channel.members.memberCount}` + " `")
    
    const chan = client.channels.cache.find(channel => channel.name === "general")
    if (chan)
        chan.send(`New channel ** ${channel.name} ** created`);

    client.channels.cache.get(channel.id).send({embeds: [embed]})
    
    console.log(`channel ${channel.name} created`);
});


client.on('disconnect', () => {
    client.user.setStatus('invisible');
    console.log(`${client.user.tag} went offline`)
});


client.login(process.env.TOKEN);
 