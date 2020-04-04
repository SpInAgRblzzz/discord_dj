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
	const prefix = "~";

	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd === "ping") {
		const msg = await message.channel.send(`pinging...`);
		msg.edit(
			`Pong\nLatancy is ${Math.floor(
				msg.createdAt - message.createdAt
			)}\nAPI Latency ${Math.round(client.ping)}ms`
		);
	}

	//custom transmission
	if (cmd === "go") {
		const connection = await message.member.voice.channel.join();
		//const dispatcher = connection.play("/sample.mp3");
		connection.play("sample.mp3", { volume: 1 });
	}

	if (cmd === "leave") {
		await message.member.voice.channel.leave();
	}
	//////

	if (cmd === "say") {
		if (message.deletable) message.delete();

		if (args.length < 1) {
			return message
				.reply("Say wa..?")
				.then((m) => m.delete({ timeout: 5000 }));
		}
		const roleColor =
			message.guild.me.displayHexColor === "#000000"
				? "#ffffff"
				: message.guild.me.displayHexColor;

		if (args[0].toLowerCase() === "embed") {
			const embed = new MessageEmbed()
				.setColor(roleColor)
				.setDescription(args.slice(1).join(" "))
				.setTimestamp()
				.setImage(client.user.displayAvatarURL)
				.setAuthor(
					message.author.username,
					message.author.displayAvatarURL
				)
				.setFooter(client.user.username, client.user.displayAvatarURL);

			message.channel.send(embed);
		} else {
			message.channel.send(args.join(" "));
		}
	}
});

client.login(process.env.TOKEN);
