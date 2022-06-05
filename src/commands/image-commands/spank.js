const Discord = require('discord.js')
const DIG = require('discord-image-generation')

module.exports.run = async(client, message, args) => {
    let user = []
    if(message.mentions.users.size === 0) return message.reply("Mention one or two user(s)!")
    else if (message.mentions.users.size === 1) {
        user[0] = message.author
        user[1] = message.mentions.users.first()
    }
    else {
        let i=0
        message.mentions.users.forEach(userx => {
            user[i] = userx
            i++
        })
    }
        
    let avatar1 = user[0].displayAvatarURL({ dynamic: false, format: 'png' });
    let avatar2 = user[1].displayAvatarURL({ dynamic: false, format: 'png' });

    let img = await new DIG.Spank().getImage(avatar1, avatar2)

    // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "rip.png");;
    message.channel.send({ files: [attach] })
}

module.exports.help = {
    name: "spank",
    description: "Someone creating nuisance? Mention that person's name or you can also mention two users and enjoy"
}