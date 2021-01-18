const mongoose = require("mongoose");

// setup connection configuration to mongodb instance
mongoose.connect("mongodb://localhost:27017/todo-cmsc100", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

/**
 * Creates connection to database
 * @returns {Promise}
 */
exports.connect = () =>
	new Promise((resolve, reject) => {
		const { connection } = mongoose;
		connection.on("error", reject);
		connection.once("open", resolve);
	});

exports.Todo = require("./models/todo")(mongoose);
exports.mongoose = mongoose;