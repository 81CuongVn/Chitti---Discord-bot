require('dotenv').config();

const packageJSON = require("../package.json");
const Discord = require('discord.js')

const client  = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES']});

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    msg = message.content;

    console.log(`[${message.author.tag}]: ${message.content}`);

    if(msg.startsWith('$')){
        const [CMD_NAME, ...args] = msg.trim().substring(1).split(/\s+/);
        if(CMD_NAME === 'hi'){
            message.channel.send(`Heyy! This is Chitti, the Robot. \nI can do whatever you wish me to do so
            \nNice to meet you, ${message.author}`);
        }
    }

    if (message.content == "$stats") {
        const discordJSVersion = packageJSON.dependencies["discord.js"];
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Bot stats - ${client.user.tag}`)
            .addField("Discord.js version", discordJSVersion);
        message.channel.send({
            embeds: [embed]
        });
    }
});

client.on('messageDelete',  (message) => {
    message.channel.send(`Haha! Caught you ${message.author} :full_moon_with_face: \nWhy delted the msg: \"${message.content}\"`)
});

client.login(process.env.TOKEN);
 