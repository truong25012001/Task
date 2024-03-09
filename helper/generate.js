module.exports.generateRadomString = (length) => {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i = 0; i <= length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}


module.exports.generateRadomNumber = (length) => {
	let result = "";
	const characters = "0123456789";

	for( var i = 0; i <= length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}