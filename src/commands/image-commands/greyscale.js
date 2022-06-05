const Discord = require('discord.js')
const DIG = require('discord-image-generation')

module.exports.run = async(client, message, args) => {
    let user = ''
    if(!args[0]) user = message.author;
    else {
        if(!message.mentions.users.first()) return message.reply("Mention a user too or leave it without any arguments to use on yourselves!")
        else user = message.mentions.users.first();
    }
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

    let img = await new DIG.Greyscale().getImage(avatar)

    // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "greyscale.png");;
    message.channel.send({ files: [attach] })
}

module.exports.help = {
    name: "greyscale",
    description: "Get the greyish shaded image"
}