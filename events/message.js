const {eteryunSync} = require("../index");
const config = require("../config.json");
const permited = ['291620819820347393']

eteryunSync.on("message", async message => {
   let prefix = config.prefix;
   let messageArray = message.content.split(" ");
   let command = messageArray[0];
   let args = messageArray.slice(1);

   if (permited.includes(message.member.id) && (message.content.startsWith(`<@${eteryunSync.user.id}>`) || message.content.startsWith(`<@!${eteryunSync.user.id}>`))) {        
        return message.channel.send('Online!').then(msg => setTimeout(() => {msg.delete()}, 3*1000));
    }
   
   if (!(message.content.startsWith(prefix)) || message.author.bot || message.channel.type === "dm") return;
   
   if (message.member.hasPermission('MANAGE_ROLES') || permited.includes(message.member.id)){
      let commandfile = eteryunSync.commands.get(command.slice(prefix.length)) || eteryunSync.commands.get(eteryunSync.aliases.get(command.slice(prefix.length)));
      if (commandfile) commandfile.run(eteryunSync, message, args, prefix);
   } else {
      message.delete();
      message.channel.send('Você não tem permissão para usar um comando meu!').then(m => setTimeout(() => {m.delete()}, 3 * 1000));
   }
   
})
