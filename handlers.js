const Discord = require("discord.js");
const fs = require("fs");

module.exports = (eteryunSync) => {
    eteryunSync.commands = new Discord.Collection();
    eteryunSync.aliases = new Discord.Collection();
    
    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        
        let jsFiles = files.filter(f => f.split(".").pop() == "js");
        if (jsFiles.length == 0) return console.log("[INFO] Nenhum evento foi carregado...")
        
        console.log("\n[INFO] Carregando eventos...")
        jsFiles.forEach((f, i) => {
            require(`./events/${f}`);
            console.log(`[INFO] Evento ${f} carregado.`);
        });
        console.log(`[INFO] ${jsFiles.length} eventos carregados.`)
    });
    
    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(err);
        
        let jsFiles = files.filter(f => f.split(".").pop() == "js");
        if (jsFiles.length == 0) return console.log("[INFO] Nenhum comando foi carregado...")
        
        console.log("\n[INFO] Carregando comandos...")
        jsFiles.forEach((f, i) => {
            let props = require(`./commands/${f}`);
            eteryunSync.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
                eteryunSync.aliases.set(alias, props.help.name);
            });
            console.log(`[INFO] Comando ${props.help.name} carregado.`);
        });
        console.log(`[INFO] ${jsFiles.length} comandos carregados.`)
    });
}