const mongoose = require("mongoose");
const generate = require("../../../helper/generate");

const userSchema = new mongoose.Schema(
	{
		fullName: String,
		email: String,
		password: String,
		tokenUser: String,
		deleted: {
			type: Boolean,
			default: false
		},
		deleteAt: Date
	}, {
	timestamps: true
}
);

const User = mongoose.model("User", userSchema, "user");
module.exports = User;