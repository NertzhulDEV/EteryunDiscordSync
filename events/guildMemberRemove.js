const config = require('../config.json');
const {eteryunSync} = require("../index");

eteryunSync.on('guildMemberRemove', removedMember => {
    if (removedMember.guild.id === config.server1id) {
        setTimeout(() => {
            const guild1 = eteryunSync.guilds.cache.find(guild => guild.id === config.server1id);
            const guild2 = eteryunSync.guilds.cache.find(guild => guild.id === config.server2id);
            const guild3 = eteryunSync.guilds.cache.find(guild => guild.id === config.server3id);
            let memberIn1 = removedMember;
            let memberIn2 = guild2.members.cache.find(mem => mem.id === removedMember.user.id);
            let memberIn3 = guild3.members.cache.find(mem => mem.id === removedMember.user.id);
            let member1Roles = memberIn1._roles;
            
            if (member1Roles.length > 0) {
                member1Roles.forEach(roleId => {
                    let server1Role = guild1.roles.cache.find(ro => ro.id === roleId)
                    let apply = guild2.roles.cache.find(r => r.name === server1Role.name);
                    let apply3 = guild3.roles.cache.find(r => r.name === server1Role.name);
                    if (apply && memberIn2) {
                        memberIn2.roles.remove(apply).catch(err => console.log(err));
                    }
                    if (apply3 && memberIn3) {
                        memberIn3.roles.remove(apply3).catch(err => console.log(err));
                    }
                });
            }
        }, 3000);
    }
});