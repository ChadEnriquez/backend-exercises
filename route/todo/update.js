const { Todo } = require("../../db");
/**
 * Update one todos
 *
 * @param {*} app
 */
exports.update = (app) => {
	/**
	 * Update one todo from database
	 * give unique ID and payload
	 * @param {import('fastify').FastifyRequest} request
	 * @param {import('fastify').FastifyReply<Response>} response
	 */

	// "/todo/:id"
	app.put("/todo/:id", async (request, response) => {
		const { params, body } = request;
		const { id } = params;
		//gets text and done
		const { text, done } = body || {};
		// should be getting at least text or done property
		if (!text && (done === null || done === undefined)) {
			return response.code(400).send({
				success: false,
				code: "todo/malformed",
				message: "Payload doesnt have text property",
			});
		}
		const oldData = await Todo.findOne({ id }).exec();

		if (!oldData) {
			return response.code(404).send({
				success: false,
				code: "todo/not-found",
				message: "Todo doesnt exist",
			});
		}
		const update = {};

		if (text) {
			update.text = text;
		}
		if (done !== undefined && done !== null) {
			update.done = done;
		}

		update.dateUp = new Date().getTime();
		const data = await Todo.findOneAndUpdate({ id }, update, {
			new: true,
		}).exec();

		return {
			success: true,
			data,
		};
	});
};
