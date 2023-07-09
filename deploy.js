const { REST, Routes } = require('discord.js')
const { clientId, token } = require('./config.json')
const fs = require('node:fs')
// 上面三行是把一些指令載入所需的套件載入下來

const commands = [] // 這個commands待會會裝commands資料夾內的'data'的部分
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // 讀取commands資料夾裡副檔名是'.js'的檔案
for (const file of commandFiles) {
	const command = require(`./commands/${file}`) // 獲取 'data'
	commands.push(command.data.toJSON()) // 將 'data' 封裝進 'commands' 容器中
}

const rest = new REST({ version: '10' }).setToken(token); // 使用 REST 模組來開始向 Discord API 傳輸資料

(async () => {
	try {
		console.log(`載入 ${commands.length} 個斜線指令中`)

		const data = await rest.put( // 開始傳輸
			Routes.applicationCommands(clientId), // 注意! 這裡如果要用guild command請使用 `applicationGuildCommands(clientId, guildId)`!
			{ body: commands },
		)

		console.log(`${data.length} 個斜線指令載入成功!`)
	} catch (error) {
		console.error(error)
	}
})()