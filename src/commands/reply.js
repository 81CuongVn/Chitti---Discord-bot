const Discord = require('discord.js')
var https = require('https')

module.exports.run = async(client, message, args) => {
    let params = encodeURIComponent(message.content.split("reply ")[1]);
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;

    https.get(uri, (res)=> {
        let data = ''
        res.on('data',(chunk) => {
            data += chunk
        })
        res.on('end', () => {
            message.reply(JSON.parse(data).magic.answer)
        })
    });   
    
}

module.exports.help = {
    name: "reply",
    description: "Ask any question and you'll get the answer :) "
}