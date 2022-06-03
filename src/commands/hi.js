const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    message.channel.send(`Heyy! This is Chitti, the Robot. \nI can do whatever you wish me to do so`
             +`\nNice to meet you, ${message.author}`);
}

module.exports.help = {
    name: "hi",
    description: "Say hi to Chitti!"
}