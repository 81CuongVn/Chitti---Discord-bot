const Discord = require('discord.js')
const DIG = require('discord-image-generation')

module.exports.run = async(client, message, args) => {
    let user = ''
    if(!message.mentions.users.first()) user = message.author
    else user = message.mentions.users.first();
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

    let img = await new DIG.Thomas().getImage(avatar)

    // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "rip.png");;
    message.channel.send({ files: [attach] })
}

module.exports.help = {
    name: "thomas",
    description: "Remember Thomas engine from your scl days? Have fun!"
}