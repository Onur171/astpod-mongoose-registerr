const { WebhookClient, MessageEmbed } = require("discord.js");
const Base = require("../../Base/Command");
const cfg = require("../../../config.json");
const Database = require("../../../Member.js");


 class İsim extends Base {
  constructor(client) {
    super(client, {
      Commands: ["isimler", "history"],
      Description: "İsimler algoritması.",
      Usage: "isimler",
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
    Database.findOne({userID: member.id}, async (err,res) => {
    if (!res) return message.channel.send(embed.setDescription(`Kullanicinin kayit gecmisinde herhangi bir kayit bulunmuyor!`));
    res = res.isimler.reverse();
    const History = res.map((e, i) =>`\`${i + 1}.\` \`${e.name}\` - <@&${e.rol}> (**__Yetkili__**: <@${e.author}>)`);
    History.chunk(20).forEach(x => {
      message.channel.send({
        embed: {
          author: {name: message.guild.name, icon_url:message.guild.iconURL({dynamic:true})},
          description: x.join(",\n"),
          color: "BLACK",
          timestamp:new Date()}});
   });
 });
 }
}

module.exports = İsim;