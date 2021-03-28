const moment = require("moment");
moment.locale("tr");
const Base = require("../Base/Event"),
    { Client } = global,
    cfg = require('../../config.json');

class guildMemberAdd extends Base {
    constructor(client) {
        super({ 
            Name: "guildMemberAdd"
        });
    }
  
async Execute(message) {
   const args = message.content.slice(cfg.Bot.Prefix.length).trim().split(/ +/);
   const member message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  member.roles.add(cfg.yetki.unregister);
  message.guild.channels.cache.get(cfg.kanallar.registerChat).send(`
Sunucumuza hoş geldin ${member}

Hesabın **${moment(member.user.createdAt).format("YYYY/MM/DD HH:mm:ss")}** tarihin de oluşturulmuş.
    
"V. Confirmed" adlı odaya giriş yapıp teyit vererek kayıt olabilirsiniz (\`${cfg.tag.taglıTag}\`) tagımızı alarak bize destek olabilirsiniz.
  
Seninle birlikte **${member.guild.memberCount}** kişiye ulaştık! :tada::tada::tada:
`)
}
}

module.exports = guildMemberAdd;
