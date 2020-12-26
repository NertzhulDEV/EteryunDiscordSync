const config = require('../config.json');
const {eteryunSync} = require("../index");
const cargos = config.cargos;

addRole = (member, roleId) => {
    let guild1 = eteryunSync.guilds.cache.find(guild => guild.id === config.server1id);
    let guild2 = eteryunSync.guilds.cache.find(guild => guild.id === config.server2id);
    let guild3 = eteryunSync.guilds.cache.find(guild => guild.id === config.server3id);
    let roleToAdd1 = guild1.roles.cache.find(r => r.id === roleId);
    let roleToAdd2 = guild2.roles.cache.find(r => r.name === roleToAdd1.name);
    let roleToAdd3 = guild3.roles.cache.find(r => r.name === roleToAdd1.name);

    let member2 = guild2.members.cache.find(mem => mem.id === member.id);
    if (member2 && roleToAdd2 && cargos.includes(roleToAdd2.name)) {
        member2.roles.add(roleToAdd2).catch(err => console.log('err ' + err));
    }

    let member3 = guild3.members.cache.find(mem => mem.id === member.id);
    if (member3 && roleToAdd3 && cargos.includes(roleToAdd3.name)) {
        member3.roles.add(roleToAdd3).catch(err => console.log('err ' + err));
    }
}

removeRole = (member, roleId) => {
    let guild1 = eteryunSync.guilds.cache.find(guild => guild.id === config.server1id);
    let guild2 = eteryunSync.guilds.cache.find(guild => guild.id === config.server2id);
    let guild3 = eteryunSync.guilds.cache.find(guild => guild.id === config.server3id);
    let roleToRemove1 = guild1.roles.cache.find(r => r.id === roleId);
    let roleToRemove2 = guild2.roles.cache.find(r => r.name === roleToRemove1.name);
    let roleToRemove3 = guild3.roles.cache.find(r => r.name === roleToRemove1.name);

    let member2 = guild2.members.cache.find(mem => mem.id === member.id);
    if (member2 && roleToRemove2) {
        member2.roles.remove(roleToRemove2).catch(err => console.log(err));
    }

    let member3 = guild3.members.cache.find(mem => mem.id === member.id);
    if (member3 && roleToRemove3) {
        member3.roles.remove(roleToRemove3).catch(err => console.log(err));
    }
}

eteryunSync.on('guildMemberUpdate', update => {    
    if (update.guild.id === config.server1id) {      
        let oldRoles = update._roles;
        let newRoles = update.guild.members.cache.find(member => member.id === update.user.id)._roles;
        let memberId = update.user.id;
        let member = update.guild.members.cache.find(member => member.id === memberId);

        if (oldRoles.length > newRoles.length) {
            let roleToRemoveId = oldRoles.filter(id => !newRoles.includes(id))[0];
            removeRole(member, roleToRemoveId);
        }

        if (oldRoles.length < newRoles.length) {
            let roleToAddId = newRoles.filter(id => !oldRoles.includes(id))[0];
            addRole(member, roleToAddId);
        }
    }
});
