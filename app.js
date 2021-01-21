const fastify = require("fastify");
const swagger = require("fastify-swagger");
const { route } = require("./route");
const { connect } = require("./db");
const { name: title, description, version } = require("./package.json");

/**
 * Initialize server
 * @param {{ logger: boolean, trustProxy: boolean  }} opts
 * @returns {*}
 */
exports.build = async (
	opts = {
		logger: false,
		trustProxy: false,
	}
) => {
	//initialize the server = Fastify
	const app = fastify(opts);
	app.register(swagger, {
		routePrefix: "/docs",
		exposeRoute: true,
		swagger: {
			info: {
				title,
				description,
				version,
			},
			schemes: ["http", "https"],
			consumes: ["application/json"],
			produces: ["application/json"],
			definitions,
		},
	});
	await connect();
	route(app);
	return app;
};

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */
