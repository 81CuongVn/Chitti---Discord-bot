const Discord = require('discord.js')

const fs = require('fs');

let rawdata = fs.readFileSync('./version.json');
let version = JSON.parse(rawdata);

let latestv = Object.keys(version).sort().pop()

module.exports.run = async(client, message, args) => {
    let sicon = message.guild.iconURL;
    let embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.tag}`)
        .setColor("#ff0000")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name+"")
        .addField("Created On", message.guild.createdAt+"")
        .addField("You Joined", message.member.joinedAt+"")
        .addField("Total Members", message.guild.memberCount+"")
        .addField("Bot Version", latestv)
    message.channel.send({
        embeds: [embed]
    });
}

module.exports.help = {
    name: "info",
    description: "Get the server information"
}