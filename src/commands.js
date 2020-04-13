exports.playCommands = ["play", "здфн", "start", "ыефке"];
exports.leaveCommands = ["leave", "дуфму", "gtfo", "пеащ", "goaway", "пщфцфн"];
exports.pauseCommands = ["pause", "stop"];
exports.resumeCommands = ["go", "resume"];
exports.getCommandValidator = function getCommandValidator(command) {
	return function (item) {
		return item === command;
	};
};
