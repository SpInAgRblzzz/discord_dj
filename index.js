const Discord = require("discord.js");
const { config } = require("dotenv");

const client = new Discord.Client({
	disableEveryone: true
});

config({
	path: __dirname + "/.env"
});

client.on("ready", () => {
	console.log(`Yo! Ma name is ${client.user.username}`);

	client.user.setPresence({
		status: "online",
		game: {
			name: "Getting developed",
			type: "IMPROVING"
		}
	});
});

client.login(process.env.TOKEN);
