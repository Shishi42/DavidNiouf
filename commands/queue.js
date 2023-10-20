const Discord = require("discord.js")

module.exports = {

  name: "queue",
  description: "Send the list of the first 10 songs in the queue",
  permission: null,
  dm: false,
  category: "Music",

  async run(bot, message, args) {
    const queue = bot.player.nodes.get(message.guildId)

		if (!queue || !queue.node.isPlaying()){
			await message.reply({content: "There are **no songs** in the queue.", ephemeral: true})
			return
		}

    const months = [':one:',':two:',':three:',':four:',':five:',':six:',':seven:',':eight:',':nine:',':keycap_ten:']

    const queueString = queue.tracks.data.slice(0, 10).map((song, i) => {
        return `${months[i]} \`${song.title}\` - [${song.duration}] - ${song.requestedBy.username}`
    }).join("\n")

    const currentSong = queue.currentTrack
    await message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setDescription(`**Currently Playing**\n` + (currentSong ? `\`${currentSong.title}\` - [${currentSong.duration}] - ${currentSong.requestedBy.username}` : "None"))
          .addFields({name: "Queue", value: `${queueString}`})
          .setFooter({text: `Requested by ${message.user.username}`, iconURL: `${message.user.displayAvatarURL({dynamic: true})}`})
          .setTimestamp()
          .setColor(bot.color)
      ]
    })
  }
}
