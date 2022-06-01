require('dotenv').config();

const packageJSON = require("../package.json");
const Discord = require('discord.js')

const client  = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES']});

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    msg = message.content;

    console.log(`[${message.author.tag}]: ${message.content}`);

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
        else if(CMD_NAME ==='stats'){
            const discordJSVersion = packageJSON.dependencies["discord.js"];
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Bot stats - ${client.user.tag}`)
                .addField("Discord.js version", discordJSVersion);
            message.channel.send({
                embeds: [embed]
            });
        }
        else if(CMD_NAME === 'help'){

        }
        else 
            return message.reply("Couldn't find the command. Try again or run '$help'")
    }
});


client.on('messageDelete',  (message) => {
    message.channel.send(`Haha! Caught you ${message.author} :full_moon_with_face: \nWhy delted the msg: \"${message.content}\"`)
});


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

client.login(process.env.TOKEN);
 