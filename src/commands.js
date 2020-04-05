exports.playCommands = ["play", "здфн", "go", "пщ", "start", "ыефке"];
exports.leaveCommands = ["leave", "дуфму", "gtfo", "пеащ", "goaway", "пщфцфн"];
exports.getCommandValidator = function getCommandValidator(command) {
	return function (item) {
		return item === command;
	};
};
