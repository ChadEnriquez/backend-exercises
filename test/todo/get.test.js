const { getTodos } = require("../../lib/get-todos");
const { delay } = require("../../lib/delay");
const { writeFileSync } = require("fs");
const { join } = require("path");
const { build } = require("../../app");
const should = require("should");
require("tap").mochaGlobals();

describe("For the route for getting one todos GET: (/todo/:id)", () => {
	let app;
	const ids = [];
	const filename = join(__dirname, "../../database.json");
	const encoding = "utf8";

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
		const todos = getTodos(filename, encoding);
		for (const id of ids) {
			const index = todos.findIndex((todo) => todo.id === id);
			//delete id
			if (index >= 0) {
				todos.splice(index, 1);
			}
			writeFileSync(filename, JSON.stringify({ todos }, null, 2), encoding);
		}
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

		const todos = getTodos(filename, encoding);
		const index = todos.findIndex((todo) => todo.id === id);
		const todo = todos[index];
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
