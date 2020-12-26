const {eteryunSync} = require("../index");
const botConfig = require("../config.json");
require('dotenv').config();

eteryunSync.login(process.env.TOKEN);
eteryunSync.on("ready", async function() {
    eteryunSync.user.setActivity("Eteryun Network", { type: "PLAYING"});
    if (botConfig.cargos.length == 0){
        console.log(`\n[WARN] Nenhum cargo foi encontrado na config.\n[WARN] Por favor certifique-se de registrar seus cargos para serem sincronizados!`)
    }
    console.log(`\nBot inciado com sucesso!`)
});