const { WebhookClient, MessageEmbed } = require("discord.js");
const Base = require("../../Base/Command");
const cfg = require("../../../config.json");

 class İsim extends Base {
  constructor(client) {
    super(client, {
      Commands: ["isim", "i"],
      Description: "Nick kayıt etme algoritması.",
      Usage: "nick",
      Enabled: true,
      DevOnly: false, 
      GuildOnly: true, 
      Category: "kayıt"
    });
  }
  
  async Execute(client, message, args, config) {
    if (!cfg.yetki.register.some(id => message.member.roles.cache.has(id)) && (!message.member.hasPermission("ADMINISTRATOR"))) return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send("**Bir üye etiketlemelisin**").then(x => x.delete({ timeout: 5000 }))
    let embed = new MessageEmbed().setColor("BLACK");
    const isim = args.slice(1).join(" | ");
    const tag = member.user.username.includes(cfg.tag.taglıTag) ? cfg.tag.taglıTag : (cfg.tag.tagsızTag === "" ? cfg.tag.taglıTag : cfg.tag.tagsızTag);
    member.setNickname(`${tag} ${isim}`);
    message.react(cfg.emoji.evet)
    message.channel.send(embed.setDescription(`${member} adlı üye'nin "${tag} ${isim}" degiştirildi!`))
 }
}

module.exports = İsim;