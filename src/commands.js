exports.playCommands = ["play", "go", "start"];
exports.leaveCommands = ["leave", "gtfo", "goaway"];
exports.getCommandValidator = function getCommandValidator(command) {
	return function (item) {
		return item === command;
	};
};
