class LocalPlaylist {
	first = null;
	last = null;

	add(link) {
		if (!this.first) {
			this.first = new PlaylistItem(link);
			this.last = this.first;
			return;
		}

		const buffer = this.last;
		this.last = new PlaylistItem(link);
		buffer.next = this.last;
	}

	goNext() {
		if (this.first === this.last) {
			this.first = null;
			this.last = null;
			return;
		}
		this.first = this.first.next;
	}

	/**TRASH**/
	getFirst() {
		try {
			return this.first.link;
		} finally {
			this.goNext();
		}
	}
}

class PlaylistItem {
	constructor(link) {
		this.link = link;
	}
}

module.exports.LocalPlaylist = LocalPlaylist;
