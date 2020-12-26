const config = require('../config.json');
const {eteryunSync} = require("../index");
const cargos = config.cargos;

module.exports.run = (client, message) => {    
    let guild1 = eteryunSync.guilds.cache.find(guild => guild.id === config.server1id);
    let guild2 = eteryunSync.guilds.cache.find(guild => guild.id === config.server2id);
    let guild3 = eteryunSync.guilds.cache.find(guild => guild.id === config.server3id);

    let guildMembers = guild1.members.cache;
    if (guildMembers.size > 0) {
        guildMembers.forEach(user => {
            let memberRoles = user.roles.cache;
            let memberIn2 = guild2.members.cache.find(m => m.id === user.id);
            let memberIn3 = guild3.members.cache.find(m => m.id === user.id);

            if (memberRoles.size > 0){
                memberRoles.forEach(role => {
                    if (cargos.includes(role.name)){
                        let applyIn2 = guild2.roles.cache.find(r => r.name === role.name);
                        let applyIn3 = guild3.roles.cache.find(r => r.name === role.name);
                        if (applyIn2 && memberIn2) {
                            memberIn2.roles.add(applyIn2).catch(err => console.log(err));
                        }
                        if (applyIn3 && memberIn3) {
                            memberIn3.roles.add(applyIn3).catch(err => console.log(err));
                        }
                    }
                });
            }
        });        
    }
}

module.exports.help = {
    name: "update",
    aliases: ["atualizar"]
}