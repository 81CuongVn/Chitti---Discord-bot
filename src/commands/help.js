const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async(client, message, args) => {
    
    // read all the files
    fs.readdir("./src/commands/", (err, files) => {
        if(err) console.log(err);
        let jsFile = files.filter(f => f.split(".").pop() == "js");

        let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Here's a list of currently available commands: ")
                .setThumbnail(client.user.displayAvatarURL());
            
         // embed all the commands 
         jsFile.forEach(f => {
            let props = require(`./${f}`);
            embed.addField(" \u200B ", "**- " + props.help.name +"** : " + props.help.description);
        });

        const image_button = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('help_image_commands')
                        .setLabel('Image Commands')
                        .setStyle('SECONDARY')
                );

        message.channel.send({
            content: "Don't worry! I am here to help you if you are facing any probs :)\n",
            embeds: [embed],
            components: [image_button]
        })
    })
    
}

module.exports.help = {
    name: "help",
    description: "Get the list of commands along with their info"
}