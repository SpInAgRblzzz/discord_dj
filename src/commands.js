exports.playCommands = ["play", "go", "start"];
exports.matchCommand = function matchCommand(command) {
	return function (item) {
		return item === command;
	};
};
