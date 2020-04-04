const { Client, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
	disableEveryone: true,
});

config({
	path: __dirname + "/.env",
});

client.on("ready", () => {
	console.log(`Yo! Ma name is ${client.user.username}`);

	client.user.setPresence({
		status: "online",
		game: {
			name: "Getting developed",
			type: "IMPROVING",
		},
	});
});

client.on("message", async (message) => {
	const prefix = "!";

	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const comand = args.shift().toLowerCase();

	//custom transmission
	if (comand === "go") {
		const connection = await message.member.voice.channel.join();
		//const dispatcher = connection.play("/sample.mp3");
		connection.play("sample.mp3", { volume: 1 });
	}

	if (comand === "leave") {
		await message.member.voice.channel.leave();
	}
	//////
});

client.login(process.env.TOKEN);
