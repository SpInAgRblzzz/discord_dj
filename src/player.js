const youtubeSearch = require("youtube-search");
const youtubeSearchOptions = {
	maxResults: 5,
	key: process.env.YOUTUBE_KEY,
};

const ytdl = require("ytdl-core");
const { LocalPlaylist } = require("./localPlaylist");

class Player {
	connection = null;
	localPlaylist = new LocalPlaylist();
	isPlaying = false;

	async play(channel, search) {
		this.connection = !this.connection
			? await channel.join()
			: this.connection;

		////youtube search
		youtubeSearch(
			search,
			youtubeSearchOptions,
			function (err, results) {
				if (err) return console.log(err);

				if (results.length === 0) {
					console.log("no results");
					return;
				}

				const link = results.find((searchResult) =>
					searchResult.link.includes("/watch")
				).link;

				handleAudioBroadcast.bind(this)(link, channel);

				//console.log(link);
			}.bind(this)
		);
	}

	async leave(channel) {
		if (!this.connection) {
			console.log("а я и не заходил");
			return;
		}
		await channel.leave();
		this.connection = null;
		this.isPlaying = false;

		//console.log(`after leave connection === ${this.connection}`);
	}

	async pause() {
		if (!this.connection) {
			console.log("nothing to pause");
			return;
		}
		this.connection.pause();
	}

	async resume() {
		if (!this.connection) {
			console.log("nothing to resume");
			return;
		}
		this.connection.resume();
	}
}

module.exports.Player = Player;

function handleAudioBroadcast(link, channel) {
	if (!this.isPlaying) {
		console.log("player is not active. starting broadcast");
		this.connection
			.play(
				ytdl(link, {
					filter: "audioonly",
				})
			)
			.on(
				"finish",
				function () {
					console.log("finished palying");
					this.isPlaying = false;
					if (!this.localPlaylist.first) {
						console.log("playlist is empty. leaving");
						this.leave(channel);
					} else {
						console.log("something is in playlist");
						handleAudioBroadcast.bind(this)(
							this.localPlaylist.getFirst(),
							channel
						);
					}
				}.bind(this)
			);
		this.isPlaying = true;
	} else {
		console.log("adding to playlist");
		this.localPlaylist.add(link);
	}
}
