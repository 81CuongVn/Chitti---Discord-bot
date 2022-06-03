const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    if(!message.member.permissions.has('KICK_MEMBERS'))
        return message.reply("You don't have permission to use that command!");
    
    // Receives the User type object
    let member = message.mentions.users.first();
    if(message.mentions.everyone) return message.reply("Heyy! You can't kick everyone!\nIdiot, everyone includes you too!!")
    if(!member) return message.reply("Mention the user you want to kick!");


    const guildMember = message.guild.members.cache.get(member.id);
    let reason = args.slice(1).join(" ");

    if(!reason) reason = "No reason given";

    if(member.kickable) {
        member.kick(reason)
            .catch(console.error);
        member.send(`You have been kicked from **${message.guild.name}**.\nReason: ${reason}\nModerator: ${message.member.user.tag}`);
        //message.channel.send(`Successfully kicked **${member.user.tag}** from the server. Reason: ${reason}.`);
        const embed = new Discord.RichEmbed()
                .setTitle('Member Kicked')
                .addField('Kicked Member', `${member.tag} (ID:${member.id})`)
                .addField('Reason', `${reason}`)
                .addField('Moderator', `${message.member.user.tag} (ID:${message.member.id})`)
                .setTimestamp()
                .setColor('RED');

        message.channel.send({embeds: [embed]})
    }
    else {
        message.reply("Unable to kick the user!\nTry checking the roles and permissions ^_^");
    }
}

module.exports.help = {
    name: "kick",
    description: "Kicks the mentioned user"
}