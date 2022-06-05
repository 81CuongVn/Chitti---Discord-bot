const Discord = require('discord.js')
var https = require('https')

module.exports.run = async(client, message, args) => {
    let uri = 'https://api.waifu.im/'
    let uri_random = uri + "random/"
    let query = "?is_nsfw=false"
    let data = ''
    https.get(uri_random + query, (res) => {
        res.on('data', (chunk) => {
            data += chunk
        })
        res.on('end', ()=>{
            let image = JSON.parse(data).images[0]
            let img = image.url
            let description = image.tags[0].description
            console.log(description)
            let embed = new Discord.MessageEmbed()
                .setImage("attachment://img.png")
                .setFooter(description, "")
            let attach = new Discord.MessageAttachment(img, "image.png");
            message.channel.send({ embed: embed, files: [attach]})
        })
    })
}

module.exports.help = {
    name: "anime",
    description: "Get the random anime characters images"
}