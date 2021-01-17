const { create } = require("./create")
const { getMany } = require("./get-many")
const { get } = require("./get")

/**
 * initialize routes for creating todo
 * @param {*} app 
 */
exports.todo = (app) => {
    create(app)
    getMany(app)
    get(app)
}

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */