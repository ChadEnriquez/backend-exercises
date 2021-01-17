const { create } = require("./create")
const { getMany } = require("./get-many")
const { get } = require("./get")
const { update } = require("./update")


/**
 * initialize routes for creating todo
 * @param {*} app 
 */
exports.todo = (app) => {
    create(app)
    getMany(app)
    get(app)
    update(app)
}

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */