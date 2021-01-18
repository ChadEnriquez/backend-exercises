const { getTodos } = require("../../lib/get-todos");
const { writeFileSync } = require("fs");
const { join } = require("path");
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
	app.put("/todo/:id", (request, response) => {
		const { params, body } = request;
		const { id } = params;
		//gets text and done
		const { text, done } = body || {};
		const filename = join(__dirname, "../../database.json");
		const encoding = "utf8";
		const todos = getTodos(filename, encoding);

		const index = todos.findIndex((todo) => todo.id === id);

		if (index < 0) {
			return response.code(404).send({
				success: false,
				code: "todo/not-found",
				message: "Todo doesnt exist",
			});
		}
		//expects at least a text or done property
		if (!text && (done === null || done === undefined)) {
			return response.code(400).send({
				success: false,
				code: "todo/malformed",
				message: "Payload doesnt have text property",
			});
		}
		const data = todos[index];

		if (text) {
			data.text = text;
		}
		if (done) {
			data.done = done;
		}

		todos[index] = data;

		const newDatabaseStringConts = JSON.stringify({ todos }, null, 2);
		writeFileSync(filename, newDatabaseStringConts, encoding);

		return {
			success: true,
			data,
		};
	});
};
