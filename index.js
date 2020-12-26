const Discord = require("discord.js");
const eteryunSync = new Discord.Client();
require("./handlers")(eteryunSync);
module.exports = {eteryunSync: eteryunSync}