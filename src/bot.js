require('dotenv').config();

const fs = require('fs')
const Discord = require('discord.js')

const client  = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES' , 'GUILD_PRESENCES']});
client.commands = new Discord.Collection();

const Prefix = '$'

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`);
    client.user.setStatus("online");
});


fs.readdir("./src/commands/", (err, files) => {
    if(err) console.log(err);
    let jsFile = files.filter(f => f.split(".").pop() == "js");
    if(jsFile.length<=0){
        console.log("There is no command to load!!");
        return;
    }
    console.log(`Loading ${jsFile.length} commands!`);

    jsFile.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} command loaded!`);
        client.commands.set(props.help.name, props);
    });
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

// whenever a message is deleted
client.on('messageDelete',  (message) => {
    message.channel.send(`Haha! Caught you ${message.author} :full_moon_with_face: \nWhy delted the msg: \"${message.content}\"`)
});


// whenever a channel is created
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

// different functions to process the above used commands
function kick(message, arg){
    if(!message.member.permissions.has('KICK_MEMBERS'))
        return message.reply("You do not have the permission to use that command");

    if(arg === undefined || arg.length === 0) return message.reply('Please provide an ID of the user');

    if (arg.includes('@')){
        arg = arg.split('@')[1].split('>')[0];
    }
    
    const member = message.guild.members.cache.get(arg);
    if(!member) return message.reply("Member not found");

    try { 
        const user = message.guild.members.kick(arg);
        message.channel.send(`${user} kicked successfully! `);
    }
    catch(err){
        console.log(err);
        message.channel.send("I don't have the permission :(");
    }
}

function ban(message, arg){
    if(!message.member.permissions.has('BAN_MEMBERS'))
        return message.reply("You do not have the permission to use that command");
    
    if(arg === undefined || arg.length === 0) return message.reply('Please provide an ID of the user');
    if (arg.includes('@'))
        arg = arg.split('@')[1].split('>')[0];
    
    const member = message.guild.members.cache.get(arg);
    if(!member) return message.reply("Member not found");
    try { 
        const user = message.guild.members.ban(arg);
        message.channel.send(`${user} banned successfully! `);
    }
    catch(err){
        console.log(err);
        message.channel.send("I don't have the permission :(");
    }
}

function help(message, arg){
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Following are the currently available commands: ")
        .setThumbnail(client.user.displayAvatarURL)
        .addField(" \u200B ", "**- ban** : ` ban any user who is causing grave misconduct `")
        .addField(" \u200B ", "**- details** : ` displays the details of the user `")
        .addField(" \u200B ", "**- getdp** : ` displays the profile pic of the user `")
        .addField(" \u200B ", "**- hi** : ` say hi to Chitti `")
        .addField(" \u200B ", "**- info** : ` get the server information `")
        .addField(" \u200B ", "**- invite** : ` obtain the invite link for this bot `")
        .addField(" \u200B ", "**- kick** : ` kick any user who isn't maintaining decorum `")
        .addField(" \u200B ", "**- status** : ` get the current status of the bot `")

    message.channel.send("Don't worry! I am here to help you if you are facing any probs :)")
    message.channel.send({
        embeds: [embed]
    });
}

client.login(process.env.TOKEN);
 