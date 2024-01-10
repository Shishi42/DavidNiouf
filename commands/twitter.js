const Discord = require("discord.js")

module.exports = {

  name: "twitter",
  description: "Send beautified twitter links",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "end_link",
      description: "The links to beautify",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {
    res = args.get("end_link").value.split(' ').map((url) => `https://twitter.com/${url}`).join('\n')
    console.log(res)
    return await message.reply(res)
  }
}
