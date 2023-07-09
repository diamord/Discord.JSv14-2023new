const { Events } = require('discord.js');

// 如 client
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {		
		const command = interaction.client.commands.get(interaction.commandName); // 獲取機器人的斜線指令 (如果沒有指令會出錯)
		if (!command) {
			console.log(`找不到 /${interaction.commandName} :(`)
			return
		}

		try {
			await command.execute(interaction) // 執行指令
		} catch (error) {
			console.log(`錯誤: 執行 ${interaction} 時出錯: ${error}`)
			console.log(error)
		}
	},
};