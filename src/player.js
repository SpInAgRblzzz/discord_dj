const youtubeSearch = require("youtube-search");
const youtubeSearchOptions = {
	maxResults: 5,
	key: process.env.YOUTUBE_KEY,
};
const ytdl = require("ytdl-core");

class Player {
	constructor() {}

	connection = null;

	async play(channel, search) {
		this.connection = !this.connection
			? await channel.join()
			: this.connection;

		////youtube search
		youtubeSearch(
			search,
			youtubeSearchOptions,
			handleSearch(this.connection)
		);
	}

	async leave(channel) {
		if (!this.connection) {
			console.log("а я и не заходил");
			return;
		}
		await channel.leave();
		this.connection = null;

		console.log(`after leave connection === ${this.connection}`);
	}
}

module.exports.Player = Player;

function handleSearch(connection) {
	return function (err, results) {
		if (err) return console.log(err);

		if (results.length === 0) {
			console.log("no results");
			return;
		}

		const link = results.find((searchResult) =>
			searchResult.link.includes("/watch")
		).link;
		connection.play(
			ytdl(link, {
				filter: "audioonly",
			})
		);
		console.log(link);
	};
}
