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

    let img = await new DIG.Affect().getImage(avatar)
    let t = ''
    if(user === message.author) t = `Hehe! ${message.author} Backfired that to you due to your silly mistake`

    // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "affect.png");;
    message.channel.send({ content: t, files: [attach] })
}

module.exports.help = {
    name: "affect",
    description: "Humiliate your friend :)"
}