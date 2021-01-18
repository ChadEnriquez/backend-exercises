const { Todo } = require("../../db");

/**
 * Gets many todos
 *
 * @param {*} app
 */
exports.getMany = (app) => {
	/**
	 * Gets todos from database
	 * @param {import('fastify').FastifyRequest} request
	 */
	app.get("/todo", async (request) => {
		const { query } = request;
		const { limit = 3, startDate } = query;

		// if startDate, the query
		// should search the dateUp property
		// if dateUp is greater than or equal
		// to the startDate
		// if no startDate, it will search for
		// all given the limit
		const options = startDate
			? {
					dateUp: {
						$gte: startDate,
					},
			  }
			: {};

		const data = await Todo.find(options)
			.limit(parseInt(limit))
			.sort({
				dateUp: -1,
			})
			.exec();

		return {
			success: true,
			data,
		};
	});
};
