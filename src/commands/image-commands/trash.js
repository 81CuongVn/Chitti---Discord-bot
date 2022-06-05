const Discord = require('discord.js')
const DIG = require('discord-image-generation')

module.exports.run = async(client, message, args) => {
    if(!message.mentions.users.first()) return message.reply("Mention a user too")
    let user = message.mentions.users.first();
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

    let img = await new DIG.Trash().getImage(avatar)

    // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "rip.png");;
    message.channel.send({ files: [attach] })
}

module.exports.help = {
    name: "trash",
    description: "Wanna roast someone? Try this!"
}