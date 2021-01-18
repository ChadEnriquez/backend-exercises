const { create } = require("./create");
const { getMany } = require("./get-many");
const { get } = require("./get");
const { update } = require("./update");
const { deleteOne } = require("./delete");

/**
 * initialize routes for creating todo
 * @param {*} app
 */
exports.todo = (app) => {
	create(app);
	getMany(app);
	get(app);
	update(app);
	deleteOne(app);
};

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */
