const { Client, GatewayIntentBits, Collection } = require('discord.js') // 載入所需模組

const client = new Client({ intents: [ GatewayIntentBits.Guilds ] }) // 宣告 'client' 為 discord client(機器人)
const { token } = require('./config.json') // 將 config.json 的 token 載入進來

const fs = require('node:fs')
const path = require('node:path')

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command)
		console.log(`載入中: /${command.data.name} 載入成功!`)
	} else {
		console.log(`錯誤: ${filePath} 缺少必須的 'data' 或 'execute' 屬性!`) 
	}
}

// 9-23 執行前載入 'commands' 資料夾的指令

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)
	if (event.once) client.once(event.name, (...args) => event.execute(...args))
	else client.on(event.name, (...args) => event.execute(...args))
}

// 27-35 當有事件發生載入 'events' 資料夾內副檔名是'.js'的檔案 如果有找到則執行

client.login(token) // 當前面都沒問題 帳號登入!