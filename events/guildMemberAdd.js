const config = require('../config.json');
const {eteryunSync} = require("../index");

eteryunSync.on('guildMemberAdd', addedMember => {
    if (addedMember.guild.id === config.server2id) {
        setTimeout(() => {
            const guild1 = eteryunSync.guilds.cache.find(guild => guild.id === config.server1id);
            const guild2 = eteryunSync.guilds.cache.find(guild => guild.id === config.server2id);
            let memberIn1 = guild1.members.cache.find(mem => mem.id === addedMember.id);
            let memberIn2 = guild2.members.cache.find(mem => mem.id === addedMember.id);
            let member1Roles = memberIn1.roles.cache;
            
            if (member1Roles.size > 0) {
                member1Roles.forEach(role => {
                    let apply = guild2.roles.cache.find(r => r.name === role.name);
                    if (apply && apply.id && apply.name) {
                        memberIn2.roles.add(apply).catch(err => console.log(err));
                    } 
                });
                if (memberIn1 && memberIn1.nickname){
                    memberIn2.setNickname(memberIn1.nickname).catch(err => console.log('err ' + err));
                }
            } 
        }, 3000);
    } else if (addedMember.guild.id === config.server3id) {
        setTimeout(() => {
            const guild1 = eteryunSync.guilds.cache.find(guild => guild.id === config.server1id);
            const guild3 = eteryunSync.guilds.cache.find(guild => guild.id === config.server3id);
            let memberIn1 = guild1.members.cache.find(mem => mem.id === addedMember.id);
            let memberIn3 = guild3.members.cache.find(mem => mem.id === addedMember.id);
            let member1Roles = memberIn1.roles.cache;
            
            if (member1Roles.size > 0) {
                member1Roles.forEach(role => {
                    let apply = guild3.roles.cache.find(r => r.name === role.name);
                    if (apply && apply.id && apply.name) {
                        memberIn3.roles.add(apply).catch(err => console.log(err));
                    } 
                });
                if (memberIn1 && memberIn1.nickname){
                    memberIn3.setNickname(memberIn1.nickname).catch(err => console.log('err ' + err));
                }
            } 
        }, 3000);
    }
});