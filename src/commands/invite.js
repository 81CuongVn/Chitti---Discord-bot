const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    const link = client.generateInvite({
        permissions: [
            Discord.Permissions.FLAGS.ADMINISTRATOR
        ],
        scopes: ['bot'],
      });
      message.channel.send(`Generated bot invite link: ${link}\nDo share this bot among your friends :hugging:`);
      
}

module.exports.help = {
    name: "invite",
    description: "Obtain the invite link for this bot"
}