const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    let member = message.mentions.users.first();
    const embed = new Discord.MessageEmbed()
            .setImage(`${member.avatarURL()}`)
            .setFooter(`${member.tag}`);
    message.channel.send({embeds: [embed]});
}

module.exports.help = {
    name: "getdp",
    description: "Get the display picture of the mentioned user"
}