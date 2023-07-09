const { Events } = require('discord.js')

module.exports = {
	name: Events.ClientReady, // 當準備時觸發
    once: true, // once和on的差別是這個只會執行一次 最適合用來做開始的事件
	async execute(client) {		
		console.log(`登入: ${client.user.username} 已成功登入!`)
	},
};