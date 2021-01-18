const { Todo } = require("../../db");

/**
 * route for creating todos
 * @param {*} app
 */
exports.create = (app) => {
	// '/'
	app.post("/todo", {
		/**
		 * handles request for route
		 * @param {import('fastify').FastifyRequest} request
		 * @param {import('fastify').FastifyReply<Response>} response
		 */
		handler: async (request, response) => {
			const { body } = request;
			//gets text and done
			//default is false
			//returns empty object
			const { text, done = false } = body || {};
			if (!text) {
				return response.code(400).send({
					success: false,
					code: "todo/malformed",
					message: "Payload doesnt have text property",
				});
			}

			const data = new Todo({
				text,
				done,
				//UNIX Epoch Time in ms
				// dateCreated: new Date().getTime(),
				// dateUp: new Date().getTime(),
			});
			await data.save();
			return {
				success: true,
				data,
			};
		},
	});
};

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */
