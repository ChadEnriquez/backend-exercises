const { delay } = require("../../lib/delay");
const { mongoose, Todo } = require("../../db");
const { build } = require("../../app");
const should = require("should");
require("tap").mochaGlobals();

describe("For the route for getting one todos GET: (/todo/:id)", () => {
	let app;
	const ids = [];

	before(async () => {
		const payloads = [
			{
				text: "this is a todo",
				done: false,
			},
		];
		app = await build();
		for (let i = 0; i < 1; i++) {
			const response = await app.inject({
				method: "POST",
				url: "/todo",
				payload: {
					text: `todo ${i}`,
					done: false,
				},
			});
			const payload = response.json();
			const { data } = payload;
			const { id } = data;
			ids.push(id);
			await delay(1000);
		}
	});

	after(async () => {
		//clean database
		for (const id of ids) {
			await Todo.findOneAndDelete({ id });
		}

		await mongoose.connection.close();
	});
	// happy path
	it("It should return { success:true, data: todo } and statusCode of 200 when called using GET", async () => {
		const response = await app.inject({
			method: "GET",
			url: `/todo/${ids[0]}`,
		});
		const payload = response.json();
		const { statusCode } = response;
		const { success, data } = payload;
		const { text, id, done } = data;
		success.should.equal(true);
		statusCode.should.equal(200);

		const todo = await Todo.findOne({ id }).exec();

		text.should.equal(todo.text);
		done.should.equal(todo.done);
		id.should.equal(todo.id);
	});
	//   unhappy path
	it("It should return { success:false, message: error message } and statusCode of 404 when called using GET and id of todo is non-existent", async () => {
		const response = await app.inject({
			method: "GET",
			url: `/todo/non-existing-id`,
		});
		const payload = response.json();
		const { statusCode } = response;
		const { success, code, message } = payload;
		success.should.equal(false);
		statusCode.should.equal(404);

		should.exists(code);
		should.exists(message);
	});
});
