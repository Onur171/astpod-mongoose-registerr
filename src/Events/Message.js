const Base = require("../Base/Event"),
    { Client, Commands } = global,
    Config = require('../../config.json');

class Message extends Base {
    constructor(client) {
        super({ 
            Name: "message"
        });
    }
    async Execute(message) {
		if(message.author.bot || !message.content.startsWith(Config.Bot.Prefix)) return;
    const args = message.content.slice(Config.Bot.Prefix.length).trim().split(/ +/);
    const command = this.Commands.get(args.shift().toLowerCase());
		if(!command || !command.Enabled || (!message.guild && command.GuildOnly) || (!Config.Bot.Developers.includes(message.author.id) && command.DevOnly)) return;
		if(command) command.Execute(Client, message, args, Config);
    }
}

module.exports = Message;