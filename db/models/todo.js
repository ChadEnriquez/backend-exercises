const mongoose = require("mongoose");

// setup connection configuration to mongodb
mongoose.connect("mongodb://localhost:27017/test", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

/**
 * Creates connection to database
 * @returns {Promise}
 */
// men di kita rinig
exports.connect = () =>
	new Promise((resolve, reject) => {
		const { connection } = mongoose;
		connection.on("error", reject);
		connection.once("open", resolve);
	});

exports.mongoose = mongoose;
