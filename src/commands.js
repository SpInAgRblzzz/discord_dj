exports.playCommands = ["play", "go", "start"];
exports.validateCommand = function validateCommand(command) {
	return function (item) {
		return item === command;
	};
};
