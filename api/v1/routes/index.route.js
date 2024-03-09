const taskRoutes = require("./task.route");
const userRoutes = require("./user.route");
const middleware = require("../middleware/auth.middleware");
module.exports = (app) => {
	const version = '/api/v1';
	app.use(version + '/tasks',middleware.requireAuth, taskRoutes);
	app.use(version + '/users', userRoutes);
}