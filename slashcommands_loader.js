const Discord = require('discord.js')
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord.js")
const fs = require("fs")

module.exports = async bot => {

  fs.readdirSync("./commands").filter(f => f.endsWith(".js")).forEach(async file => {
     let command = require(`./commands/${file}`)
     bot.commands.set(command.name, command)
  })

  let commands = []

  bot.commands.forEach(async command => {

    let slashcommand = new Discord.SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.description)
    .setDMPermission(command.dm)
    .setDefaultMemberPermissions(command.permission)

    if(command.options?.length >= 1) {
        for(let i = 0; i < command.options.length; i++) {
          if(command.options[i].type === "string") slashcommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setAutocomplete(command.options[i].autocomplete).setRequired(command.options[i].required))
          else slashcommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required).addChannelTypes(command.options[i].channel_type))
        }
    }

    if(command.channel_types) {
      slashcommand.addChannelTypes(command.channel_types)
    }
    await commands.push(slashcommand.toJSON())
  })

  const rest = new REST({version: "10"}).setToken(bot.token)

  const data = await rest.put(Routes.applicationCommands(bot.user.id),{ body: commands },)
  console.log(`Successfully reloaded ${data.length} application (/) commands.`)
}
