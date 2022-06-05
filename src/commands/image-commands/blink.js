const Discord = require('discord.js')
const DIG = require('discord-image-generation')

module.exports.run = async(client, message, args) => {
    let users = message.mentions.users;
    if(users.size < 2) return message.reply("Mention atleast 2 users")
    
    let avatar= [];
    let i=0
    users.forEach((f) => {
        avatar[i] = f.displayAvatarURL({ dynamic: false, format: 'png' })
        i++
    })

    console.log(avatar.toString())
    let img = await new DIG.Blink().getImage(avatar[0], avatar[1])

    // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "blink.png");;
    message.channel.send({ files: [attach] })
}

module.exports.help = {
    name: "blink",
    description: "Tag multiple users and see the magic"
}