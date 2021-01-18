const { Todo } = require("../../db");

/**
 * Gets one todos
 *
 * @param {*} app
 */
exports.get = (app) => {
	/**
	 * Gets one todo from database
	 * give unique ID
	 * @param {import('fastify').FastifyRequest} request
	 * @param {import('fastify').FastifyReply<Response>} response
	 */
	// "/todo/:id"
	app.get("/todo/:id", async (request, response) => {
		const { params } = request;
		const { id } = params;
		const data = await Todo.findOne({ id }).exec();

		if (!data) {
			return response.code(404).send({
				success: false,
				code: "todo/not-found",
				message: "Todo doesnt exist",
			});
		}

		return {
			success: true,
			data,
		};
	});
};
