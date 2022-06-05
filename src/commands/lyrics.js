const Discord = require('discord.js')
var https = require('https')

module.exports.run = async(client, message, args) => {
    let params = encodeURIComponent(message.content.split("lyrics ")[1]);
    let uri = 'https://api.popcat.xyz/lyrics?song=' + params;

    let data = ''
    https.get(uri, (res) => {
        res.on('data', (chunk) => {
            data += chunk
        })

        res.on('end', () => {
            let json = JSON.parse(data);
            if(json.error != undefined) return message.reply("This song cannot be found! Try some other")
            const file = new Discord.MessageAttachment(json.image)

            const characterLimit = 1024
            // function to trim the length of lyrics to 1024 characters
            trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

            let lyrics = trimString(json.lyrics, characterLimit);
            const embed = new Discord.MessageEmbed()
                    .setTitle(json.title)
                    .setImage("attachment://image.png")
                    .addField("Artist ", json.artist)
                    .addField("Lyrics ", lyrics)
            message.channel.send({
                embeds: [embed],
                files: [file]
            })
        })
    })

}

module.exports.help = {
    name: "lyrics",
    description: "Get the lyrics of any song"
}