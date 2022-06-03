const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Bot's Live Status")
                .addField(" \u200B ", "**Channels** : ` " + `${client.channels.cache.size}` + " `")
                .addField(" \u200B ", "**Servers** : ` " + `${client.guilds.cache.size}` + " `")
                .addField(" \u200B ", "**Users** : ` " + `${client.users.cache.size}` + " `")

    message.channel.send({embeds: [embed]});
}

module.exports.help = {
    name: "status",
    description: "Get the current status of the bot"
}