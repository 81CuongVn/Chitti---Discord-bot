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

    let img = await new DIG.Blur().getImage(avatar)
    
    // Add the image as an attachment
    let embed = new Discord.MessageEmbed()
        .setTitle("Blur")
        .setImage("attachment://delete.png")
    let attach = new Discord.MessageAttachment(img, "blur.png");;
    message.channel.send({ embed: embed, files: [attach]})
}

module.exports.help = {
    name: "blur",
    description: "Blurrify the image :smile:"
}