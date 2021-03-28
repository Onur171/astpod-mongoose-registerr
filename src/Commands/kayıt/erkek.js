const { WebhookClient, MessageEmbed } = require("discord.js");
const Base = require("../../Base/Command");
const cfg = require("../../../config.json");
const Database = require("../../../Member.js");

 class Erkek extends Base {
  constructor(client) {
    super(client, {
      Commands: ["erkek", "e"],
      Description: "Erkek kayıt etme algoritması.",
      Usage: "erkek",
      Enabled: true,
      DevOnly: false, 
      GuildOnly: true, 
      Category: "kayıt"
    });
  }
  
  async Execute(client, message, args, config) {
    if (!cfg.yetki.register.some(id => message.member.roles.cache.has(id)) && (!message.member.hasPermission("ADMINISTRATOR"))) return;
    let embed = new MessageEmbed().setColor("BLACK");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send("**Bir üye etiketlemelisin**").then(x => x.delete({ timeout: 5000 }))
    const isim = args.slice(1).join(" | ");
    const tag = member.user.username.includes(cfg.tag.taglıTag) ? cfg.tag.taglıTag : (cfg.tag.tagsızTag === "" ? cfg.tag.taglıTag : cfg.tag.tagsızTag);
    member.setNickname(`${tag} ${isim}`);
    member.roles.add(cfg.yetki.erkek);
    member.roles.remove(cfg.yetki.remove);
    message.react(cfg.emoji.evet)
    message.channel.send(embed.setDescription(`${member} adlı kişiye başarılı şekilde <@&${cfg.yetki.erkek}> rolü verildi`))
    Database.findOne({SunucuID: message.guild.id, userID: member.id}, async (err, res) => {
    if (!res) {
      new Database({SunucuID: message.guild.id, userID: member.id, isimler: [{ name: `${tag} ${isim}`, rol: cfg.yetki.erkek[0], author: message.author.id }]}).save();
    } else {
      res.isimler.push({ name: `${isim}`, rol: cfg.yetki.erkek[0], author: message.author.id });
      res.save();
    };
  });
  Database.findOne({SunucuID: message.guild.id, userID: message.author.id}, async (err, res) => {
    if (!res) {
      new Database({SunucuID: message.guild.id, userID: message.author.id, teyitci: { erkek: 1, members: [member.id] } }).save();
    } else {
      res.teyitci.erkek = (res.teyitci.erkek + 1);
      res.teyitci.members.push(member.id);
      res.save();
    };
  });
 }
}

module.exports = Erkek;
