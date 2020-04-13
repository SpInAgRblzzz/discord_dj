const { Client } = require("discord.js");
const ytdl = require("ytdl-core");

const { config } = require("dotenv");
config({
	path: `${__dirname}/.env`,
});

const youtubeSearch = require("youtube-search");
const youtubeSearchOptions = {
	maxResults: 5,
	key: process.env.YOUTUBE_KEY,
};

const { Player } = require("./src/player");
console.log(Player);
const player = new Player();

const {
	playCommands,
	leaveCommands,
	pauseCommands,
	resumeCommands,
	getCommandValidator,
} = require("./src/commands");

const bot = new Client({
	disableEveryone: true,
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

	let channel = message.member.voice.channel;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const comand = args.shift().toLowerCase();
	const commandValidator = getCommandValidator(comand);

	//play command
	if (playCommands.some(commandValidator)) {
		player.play(channel, args.join(" "));

		/* if(true){connection = await message.member.voice.channel.join();
		//const dispatcher = connection.play("/sample.mp3");

		////youtube serch
		youtubeSearch(args.join(" "), youtubeSearchOptions, function (
			err,
			results
		) {
			if (err) return console.log(err);
			connection.play(
				ytdl(results[0].link, {
					filter: "audioonly",
				})
			);
			console.log(results);
		})}; */
		/* connection.play(
			ytdl("https://www.youtube.com/watch?v=SNCx4n2m5_o", {
				filter: "audioonly",
			})
		); */
	}

	//leave command
	if (leaveCommands.some(commandValidator)) {
		player.leave(channel);
	}

	//pause command
	if (pauseCommands.some(commandValidator)) {
		player.pause();
	}

	//resume command
	if (resumeCommands.some(commandValidator)) {
		player.resume();
	}
});

bot.login(process.env.TOKEN);
