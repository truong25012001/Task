const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	title: String,
	status: String,
	content: String,
	timeStart: Date,
	createdBy: String,
	timeFinish: Date,
	listUsers: Array,
	taskParentId: String,
	deleted: {
		type: Boolean,
		default: false
	},
	deletedAt: Date
}, {
	timestamps: true
});

const Task = mongoose.model("Task", taskSchema, "task");
module.exports = Task;