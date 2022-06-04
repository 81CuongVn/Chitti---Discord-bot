const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    const menu = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('YrOfBirth')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: '2000',
                            value: '2000'
                        },
                        {
							label: '2001',
							value: '2001',
						},
                        {
							label: '2002',
							value: '2002',
						},
                        {
							label: '2003',
							value: '2003',
						},
                        {
							label: '2004',
							value: '2004',
						},
                    ]),
            );
        message.reply({content: "Choose any one", components: [menu]})
}

module.exports.help = {
    name: "menu",
    description: "Have fun with the menu options"
}