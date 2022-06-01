require('dotenv').config();

const packageJSON = require("../package.json");
const Discord = require('discord.js')

const client  = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES']});

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`);
});


// whenever any message is created in the server
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    msg = message.content;

    console.log(`[${message.author.tag}]: ${message.content}`);

    // if it starts with $ symbol then its commanded to the bot
    if(msg.startsWith('$')){
        const [CMD_NAME, ...args] = msg.trim().substring(1).split(/\s+/);
        if(CMD_NAME === 'hi'){
            message.channel.send(`Heyy! This is Chitti, the Robot. \nI can do whatever you wish me to do so
            \nNice to meet you, ${message.author}`);
        }
        else if(CMD_NAME === 'kick'){
            kick(message, args[0]);
        }
        else if(CMD_NAME === 'ban'){
            ban(message, args[0]);
        }
        else if(CMD_NAME ==='status'){
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Bot's Live Status")
                .addField(" \u200B ", "**Channels** : ` " + `${client.channels.cache.size}` + " `")
                .addField(" \u200B ", "**Servers** : ` " + `${client.guilds.cache.size}` + " `")
                .addField(" \u200B ", "**Users** : ` " + `${client.users.cache.size}` + " `")

            message.channel.send({embeds: [embed]});
            
        }
        else if(CMD_NAME === 'help'){
            help(message, args[0]);
        }
        else if(CMD_NAME === 'info'){
            info(message, args[0]);
        }
        else if(CMD_NAME === 'invite'){
            invite_link(message);
        }
        else 
            return message.reply("Couldn't find the command. Try again or run '$help'")
    }
});

// whenever a message is deleted
client.on('messageDelete',  (message) => {
    message.channel.send(`Haha! Caught you ${message.author} :full_moon_with_face: \nWhy delted the msg: \"${message.content}\"`)
});

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


function invite_link(message) {
    const link = client.generateInvite({
        permissions: [
            Discord.Permissions.FLAGS.ADMINISTRATOR
        ],
        scopes: ['bot'],
      });
      message.channel.send(`Generated bot invite link: ${link}\nDo share this bot among your friends :hugging:`);
      
}

function info (message, arg){
    let sicon = message.guild.iconURL;
    let embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.tag}`)
        .setColor("#ff0000")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name+"")
        .addField("Created On", message.guild.createdAt+"")
        .addField("You Joined", message.member.joinedAt+"")
        .addField("Total Members", message.guild.memberCount+"")
        .addField("Bot Version", "1.1.3")
    message.channel.send({
        embeds: [embed]
    });
}

client.login(process.env.TOKEN);
 