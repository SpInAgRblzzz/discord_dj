const { bot } = require("discord.js");
const { config } = require("dotenv");
const { playCommands, validateCommand } = require("./src/commands");

const bot = new bot({
	disableEveryone: true,
});

config({
	path: __dirname + "/.env",
});

bot.on("ready", () => {
	console.log(`Yo! Ma name is ${bot.user.username}`);

	bot.user.setPresence({
		status: "online",
		game: {
			name: "Getting developed",
			type: "IMPROVING",
		},
	});
});

bot.on("message", async (message) => {
	const prefix = "!";

	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const comand = args.shift().toLowerCase();

	//play command
	if (playCommands.some(validateCommand(comand))) {
		const connection = await message.member.voice.channel.join();
		//const dispatcher = connection.play("/sample.mp3");
		connection.play("sample.mp3", { volume: 0.5 });
	}

	if (comand === "leave") {
		await message.member.voice.channel.leave();
	}
});

bot.login(process.env.TOKEN);
