const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    // User object 
    let user = message.mentions.users.first();

    if(message.mentions.everyone) return message.reply("Sorry! This is too big a task for me :slight_frown:\nPlease mention any specific user")
    if(!user) return message.reply("Mention the user too");

    // GuildMember object
    const member = message.guild.members.cache.get(user.id);

    const img = "https://www.github.com/Gagan1729-droid/Chitti---Discord-bot/tree/master/images/"+(Math.floor(Math.random()*10)+1)+".png";

    try {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Details of user ${user.tag}`)
            .setImage(img, img, 300,300)
            .addField("Joined this server at ", `${member.joinedAt}`)
            .addField("Nickname ", `${member.nickname}`)
            .addField("Is kickable? :stuck_out_tongue_closed_eyes: ", `${member.kickable}`)
            .addField("Highest Role ", `${member.roles.highest.name}`)
            .addField("Permissions ", `${member.permissions.toArray()}`)
            .addField("Status", `${member.presence.status}`)
            .setThumbnail(`${member.user.avatarURL()}`) 
            .setFooter(`${user.tag}`, `${member.user.avatarURL()}`)
            
        message.channel.send({
            embeds: [embed]
        });
    }
    catch(err) {
        console.log(err);
        message.reply("An error occurred  :face_exhaling:");
    }
}

module.exports.help = {
    name: "details",
    description: "Display the details of the mentioned user"
}